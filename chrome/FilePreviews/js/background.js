/* global chrome */
'use strict';

function openPreviewTab(url) {
  var encUrl = encodeURIComponent(url);
  chrome.tabs.create({
    url: chrome.extension.getURL('preview.html?url=' + encUrl)
  });
}

function srcHandler(info) {
  openPreviewTab(info.srcUrl);
}

function selectionHandler(info) {
  openPreviewTab(info.selectionText);
}

function linkHandler(info) {
  openPreviewTab(info.linkUrl);
}

function pageHandler(info) {
  openPreviewTab(info.pageUrl);
}

// Create one test item for each context type.
var tagContexts = ['image', 'video', 'audio'];
var textContexts = ['selection', 'editable'];
var linkContext = ['link'];
var pageContext = ['page'];

chrome.contextMenus.create({title: 'Preview from source...',
                           contexts: tagContexts, onclick: srcHandler});

chrome.contextMenus.create({title: 'Preview from selection...',
                            contexts: textContexts, onclick: selectionHandler});

chrome.contextMenus.create({title: 'Preview from link...',
                            contexts: linkContext, onclick: linkHandler});

chrome.contextMenus.create({title: 'Preview from page...',
                            contexts: pageContext, onclick: pageHandler});
