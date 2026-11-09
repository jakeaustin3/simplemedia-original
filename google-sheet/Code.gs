/**
 * Video Database — Google Sheet script
 *
 * Claude Code uploads and publishes this for you (see CLAUDE.md → "Connect my
 * Google Sheet"). Your bot sends videos here. This script saves the files to
 * its own Google Drive folder (made once, remembered by ID, so you can rename or
 * move it) and adds a row to the top of
 * the sheet. Keep the web app URL private — it works like a password.
 *
 * After changing this file: clasp push, then update the SAME deployment
 * (clasp update-deployment <id>) so the URL in settings.txt keeps working.
 */

// Run this once from the editor to grant permission. It also creates the
// Videos tab and the Drive folder.
function setup() {
  getSheet();
  getHistory();
  rootFolder();
}

const TAB = 'Videos';
const HISTORY_TAB = 'History'; // hidden: every link ever added, so deleted rows stay deleted
const DRIVE_FOLDER = 'Video Database'; // only used to find the folder of sheets made before folders were remembered
const ROW_HEIGHT = 220;
const FIRST_FRAME_COL = 7; // G
const HEADERS = ['Thumbnail', 'Link', 'Transcript', 'Folder', 'Download', 'Storyboard'];
const PROCESSING = '⏳ Processing…';
// Optional per-request `tab`: research tabs (e.g. "Research — creator") live beside Videos,
// share the History tab, and keep their files in a Drive subfolder named after the tab.

function doGet() {
  return json({ ok: true, message: 'Video Database script is running.' });
}

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    const actions = { start, redo, upload, finish, fail, pending, forget, copy, read };
    if (!actions[req.action]) return json({ ok: false, error: 'Unknown action: ' + req.action });
    return json(Object.assign({ ok: true }, actions[req.action](req)));
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// A new link arrived. Duplicate? Deleted earlier? Otherwise put a "processing" row on top.
function start(req) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = getSheet(req.tab);
    const history = getHistory();
    const row = findRow(sheet, req.link);
    if (row) {
      const status = sheet.getRange(row, 3).getValue();
      const done = status !== PROCESSING && !String(status).startsWith('❌');
      if (done) return { duplicate: true, row };
      sheet.getRange(row, 3).setValue(PROCESSING); // retry an unfinished row
    } else if (!req.tab && findLink(history, 1, req.link)) {
      return { duplicate: false, deleted: true }; // its row was deleted — keep it that way
    } else {
      if (!findLink(history, 1, req.link)) history.appendRow([req.link, new Date()]);
      sheet.insertRowBefore(2);
      sheet.getRange(2, 2, 1, 2).setValues([[req.link, PROCESSING]]);
      sheet.setRowHeightsForced(2, 1, ROW_HEIGHT);
    }
    const folder = subfolder(parentFolder(req.tab), req.name);
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return { duplicate: false, folderId: folder.getId() };
  } finally {
    lock.releaseLock();
  }
}

// Process a video again (e.g. after scene detection improved). Keeps its row, or brings a
// deleted one back on top, and empties its Drive folder so no old scene pictures are left.
function redo(req) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = getSheet(req.tab);
    const history = getHistory();
    let row = findRow(sheet, req.link);
    if (row) {
      sheet.getRange(row, 3).setValue(PROCESSING);
    } else {
      if (!findLink(history, 1, req.link)) history.appendRow([req.link, new Date()]);
      sheet.insertRowBefore(2);
      sheet.getRange(2, 2, 1, 2).setValues([[req.link, PROCESSING]]);
      sheet.setRowHeightsForced(2, 1, ROW_HEIGHT);
    }
    const folder = subfolder(parentFolder(req.tab), req.name);
    emptyFolder(folder);
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return { folderId: folder.getId() };
  } finally {
    lock.releaseLock();
  }
}

// Save files into the video's Drive folder. files: [{path, mimeType, data(base64)}]
function upload(req) {
  const folder = DriveApp.getFolderById(req.folderId);
  const ids = {};
  req.files.forEach(f => {
    const parts = f.path.split('/');
    const name = parts.pop();
    const target = parts.reduce((dir, part) => subfolder(dir, part), folder);
    const existing = target.getFilesByName(name);
    while (existing.hasNext()) existing.next().setTrashed(true); // replace on retry
    const blob = Utilities.newBlob(Utilities.base64Decode(f.data), f.mimeType, name);
    const file = target.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    ids[f.path] = file.getId();
  });
  return { ids };
}

// Everything is uploaded — fill in the row.
function finish(req) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = getSheet(req.tab);
    const row = findRow(sheet, req.link);
    if (!row) return { error: 'Row not found for ' + req.link };

    const img = id => `IMAGE("https://drive.google.com/thumbnail?id=${id}&sz=w1000", 1)`;
    const link = quote(req.link);
    const folderUrl = 'https://drive.google.com/drive/folders/' + req.folderId;
    const zipUrl = req.zipId ? 'https://drive.google.com/uc?export=download&id=' + req.zipId : '';

    const cells = [
      `=HYPERLINK("${link}", ${img(req.thumbnailId)})`,
      req.link,
      req.transcript || '(no speech detected)',
      `=HYPERLINK("${folderUrl}", "📁 Open folder")`,
      zipUrl ? `=HYPERLINK("${zipUrl}", "⬇️ Download .zip")` : '(zip too big — use folder)',
      `=${img(req.storyboardId)}`,
    ].concat(req.frameIds.map(id => `=${img(id)}`));

    sheet.getRange(row, 1, 1, cells.length).setValues([cells]);
    const extra = sheet.getLastColumn() - cells.length; // a redo with fewer scenes: clear the old ones
    if (extra > 0) sheet.getRange(row, cells.length + 1, 1, extra).clearContent();
    sheet.getRange(row, 3).setWrap(true).setVerticalAlignment('top');
    sheet.setRowHeightsForced(row, 1, ROW_HEIGHT);
    labelFrameColumns(sheet, req.frameIds.length);
    if (req.note) sheet.getRange(row, 1).setNote(req.note);
    return { row };
  } finally {
    lock.releaseLock();
  }
}

function fail(req) {
  const sheet = getSheet(req.tab);
  const row = findRow(sheet, req.link);
  if (row) sheet.getRange(row, 3).setValue('❌ ' + req.error);
  return { row };
}

// Rows that never finished (bot was turned off mid-video).
function pending(req) {
  getHistory(); // make sure deletions are tracked from the bot's first start
  const sheet = getSheet(req && req.tab);
  const last = sheet.getLastRow();
  if (last < 2) return { links: [] };
  const values = sheet.getRange(2, 2, last - 1, 2).getValues();
  return { links: values.filter(r => r[1] === PROCESSING).map(r => r[0]) };
}

// Bring back a deleted video: after this, pasting its link adds it again.
function forget(req) {
  const history = getHistory();
  const row = findLink(history, 1, req.link);
  if (row) history.deleteRow(row);
  return { forgotten: !!row };
}

// Copy finished rows from Videos (or req.from) into req.tab, e.g. a research tab for videos
// already processed. req.rows: [{link, note}] top first. Rows keep pointing at the same Drive
// folders. A row the tab already has (e.g. an unfinished one) is moved to its place on top.
function copy(req) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const source = getSheet(req.from);
    const target = getSheet(req.tab);
    const copied = [], missing = [];
    req.rows.slice().reverse().forEach(r => {
      const from = findRow(source, r.link);
      if (!from) return missing.push(r.link);
      const old = findRow(target, r.link);
      if (old) target.deleteRow(old);
      target.insertRowBefore(2);
      const row = 2;
      const width = source.getLastColumn();
      if (target.getMaxColumns() < width) target.insertColumnsAfter(target.getMaxColumns(), width - target.getMaxColumns());
      source.getRange(from, 1, 1, width).copyTo(target.getRange(row, 1, 1, width));
      target.setRowHeightsForced(row, 1, ROW_HEIGHT);
      if (r.note) target.getRange(row, 1).setNote(r.note);
      const scenes = source.getRange(from, FIRST_FRAME_COL, 1, Math.max(width - FIRST_FRAME_COL + 1, 1))
        .getFormulas()[0].filter(String).length; // scene cells are IMAGE() formulas
      if (scenes) labelFrameColumns(target, scenes);
      copied.push(r.link);
    });
    return { copied: copied.reverse(), missing };
  } finally {
    lock.releaseLock();
  }
}

// Read a tab back: per row its link, note, storyboard file ID and scenes.txt text (for
// writing a creator file from rows that were copied rather than processed locally).
function read(req) {
  const sheet = getSheet(req.tab);
  const last = sheet.getLastRow();
  if (last < 2) return { rows: [] };
  const formulas = sheet.getRange(2, 1, last - 1, 6).getFormulas();
  const values = sheet.getRange(2, 1, last - 1, 6).getValues();
  const notes = sheet.getRange(2, 1, last - 1, 1).getNotes();
  const id = s => (String(s).match(/id=([\w-]+)/) || [])[1] || '';
  const folderId = s => (String(s).match(/folders\/([\w-]+)/) || [])[1] || '';
  return {
    rows: values.map((v, i) => {
      const folder = folderId(formulas[i][3]);
      let scenes = '';
      if (folder && req.scenes) {
        const f = DriveApp.getFolderById(folder).getFilesByName('scenes.txt');
        if (f.hasNext()) scenes = f.next().getBlob().getDataAsString();
      }
      const row = { link: v[1], note: notes[i][0], transcript: v[2], folderId: folder,
                    storyboardId: id(formulas[i][5]), scenes };
      if (req.formulas) row.formulas = sheet.getRange(i + 2, 1, 1, sheet.getLastColumn()).getFormulas()[0];
      return row;
    }),
  };
}

// --- helpers ---------------------------------------------------------------

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tab = name || TAB;
  let sheet = ss.getSheetByName(tab);
  if (sheet) return sheet;

  sheet = ss.insertSheet(tab, name ? Math.min(1, ss.getSheets().length) : 0);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  [130, 160, 320, 120, 140, 260].forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  const blank = ss.getSheetByName('Sheet1');
  if (blank && blank.getLastRow() === 0) ss.deleteSheet(blank);
  return sheet;
}

function labelFrameColumns(sheet, count) {
  if (sheet.getMaxColumns() < FIRST_FRAME_COL + count) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), FIRST_FRAME_COL + count - sheet.getMaxColumns());
  }
  const labels = [];
  for (let i = 1; i <= count; i++) labels.push('Scene ' + i);
  const header = sheet.getRange(1, FIRST_FRAME_COL, 1, count);
  header.setValues([labels]).setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
  sheet.setColumnWidths(FIRST_FRAME_COL, count, 130);
}

// The hidden History tab. The first time, it starts with every link already in Videos.
function getHistory() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let history = ss.getSheetByName(HISTORY_TAB);
  if (history) return history;

  history = ss.insertSheet(HISTORY_TAB);
  history.getRange(1, 1, 1, 2).setValues([['Link', 'First added']]).setFontWeight('bold');
  history.setFrozenRows(1);
  const sheet = getSheet();
  const last = sheet.getLastRow();
  if (last >= 2) {
    const links = sheet.getRange(2, 2, last - 1, 1).getValues().filter(r => r[0]);
    if (links.length) history.getRange(2, 1, links.length, 1).setValues(links);
  }
  history.hideSheet();
  ss.setActiveSheet(sheet);
  return history;
}

function findRow(sheet, link) {
  return findLink(sheet, 2, link);
}

function findLink(sheet, column, link) {
  const last = sheet.getLastRow();
  if (last < 2) return null;
  const hit = sheet.getRange(2, column, last - 1, 1).createTextFinder(link).matchEntireCell(true).findNext();
  return hit ? hit.getRow() : null;
}

// This sheet's own Drive folder, remembered by ID so two databases never share one and
// renaming or moving it is safe.
function rootFolder() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('ROOT_FOLDER_ID');
  if (id) {
    try {
      const folder = DriveApp.getFolderById(id);
      if (!folder.isTrashed()) return folder;
    } catch (err) { /* deleted: make a new one below */ }
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(TAB);
  const hasVideos = sheet && sheet.getLastRow() >= 2;
  const existing = DriveApp.getFoldersByName(DRIVE_FOLDER);
  // A sheet made before this update already uses the "Video Database" folder: keep using it.
  const folder = hasVideos && existing.hasNext() ? existing.next() : DriveApp.createFolder(ss.getName());
  props.setProperty('ROOT_FOLDER_ID', folder.getId());
  return folder;
}

// Where a video's folder goes: the sheet's root folder, or a subfolder named after the tab.
function parentFolder(tab) {
  return tab ? subfolder(rootFolder(), tab) : rootFolder();
}

function emptyFolder(folder) {
  const files = folder.getFiles();
  while (files.hasNext()) files.next().setTrashed(true);
  const folders = folder.getFolders();
  while (folders.hasNext()) folders.next().setTrashed(true);
}

function subfolder(parent, name) {
  const found = parent.getFoldersByName(name);
  return found.hasNext() ? found.next() : parent.createFolder(name);
}

function quote(s) {
  return String(s).replace(/"/g, '""');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
