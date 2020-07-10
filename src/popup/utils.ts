import { GetStylesForPageRequest } from '../types/BackgroundPageRequest';
import { GetStylesForPageResponse } from '../types/BackgroundPageResponse';

export const getCurrentTab = (
  callback: (tab: chrome.tabs.Tab) => void
): void => {
  chrome.windows.getCurrent({ populate: true }, ({ tabs }) => {
    if (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].active) {
          callback(tabs[i]);
        }
      }
    }
  });
};

export const getStyles = (
  tab: chrome.tabs.Tab,
  callback: (styles: GetStylesForPageResponse) => void
) => {
  const request: GetStylesForPageRequest = {
    name: 'getStylesForPage',
    tab,
  };

  chrome.extension.sendRequest(request, response => {
    callback(response);
  });
};

export const getIsStylebotOpen = (
  tab: chrome.tabs.Tab,
  callback: (isOpen: boolean) => void
): void => {
  if (tab.id) {
    chrome.tabs.sendRequest(
      tab.id,
      {
        name: 'getIsStylebotOpen',
      },
      response => callback(response)
    );
  }
};

export const toggleStylebot = (tab: chrome.tabs.Tab) => {
  if (tab.id) {
    chrome.tabs.sendRequest(tab.id, {
      name: 'toggle',
    });

    window.close();
  }
};