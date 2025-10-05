import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Define the field types from your request store
type FormField = { id: string; key: string; value: string | File; type: "text" | "file"; description: string; };
type UrlEncodedField = { id: string; key: string; value: string; description: string; };
type HeaderField = { id: string; key: string; value: string; description: string; };

export interface Tab {
  id: string;
  name: string;
  method: string;
  url: string;
  requestBody: string;
  responseStatus: string;
  responseBody: string;
  isLoading: boolean;
  bodyType: 'json' | 'form-data' | 'x-www-form-urlencoded' | 'binary' | 'none';
  error: string;
  formFields: FormField[];
  urlEncodedFields: UrlEncodedField[];
  binaryBody: File | null;
  headerFields: HeaderField[];
  headersVisible: boolean;
}

interface TabsState {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: () => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateActiveTab: (data: Partial<Omit<Tab, 'id'>>) => void;
  
  // Actions to manipulate the active tab's fields
  addFormField: () => void;
  removeFormField: (id: string) => void;
  updateFormField: (id: string, fieldName: keyof FormField, newValue: string | File | null) => void;

  addUrlEncodedField: () => void;
  removeUrlEncodedField: (id: string) => void;
  updateUrlEncodedField: (id: string, fieldName: keyof UrlEncodedField, newValue: string) => void;

  addHeaderField: () => void;
  removeHeaderField: (id: string) => void;
  updateHeaderField: (id: string, fieldName: keyof HeaderField, newValue: string) => void;

  resetActiveTab: () => void;
}

const createNewTab = (): Tab => ({
  id: uuidv4(),
  name: 'Untitled Request',
  method: "GET",
  url: "",
  requestBody: "",
  responseStatus: "",
  responseBody: "",
  isLoading: false,
  error: "",
  bodyType: "json",
  formFields: [{ id: uuidv4(), key: "", value: "", type: "text", description: "" }],
  urlEncodedFields: [{ id: uuidv4(), key: "", value: "", description: "" }],
  binaryBody: null,
  headerFields: [{ id: uuidv4(), key: "", value: "", description: "" }],
  headersVisible: false,
});

export const useTabsStore = create<TabsState>((set, get) => ({
  tabs: [createNewTab()],
  activeTabId: get()?.tabs[0]?.id || null,
  addTab: () =>
    set((state) => {
      const newTab = createNewTab();
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),
  removeTab: (id) =>
    set((state) => {
      const newTabs = state.tabs.filter((tab) => tab.id !== id);
      if (newTabs.length === 0) {
        const newTab = createNewTab();
        return { tabs: [newTab], activeTabId: newTab.id };
      }
      
      let newActiveTabId = state.activeTabId;
      if (state.activeTabId === id) {
        const closingTabIndex = state.tabs.findIndex(tab => tab.id === id);
        newActiveTabId = newTabs[closingTabIndex - 1]?.id || newTabs[0]?.id || null;
      }

      return { tabs: newTabs, activeTabId: newActiveTabId };
    }),
  setActiveTab: (id) => set({ activeTabId: id }),
  updateActiveTab: (data) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === state.activeTabId ? { ...tab, ...data } : tab
      ),
    })),

  // Form Field Actions
  addFormField: () => {
    const tab = get().tabs.find(t => t.id === get().activeTabId);
    if (!tab) return;
    get().updateActiveTab({
      formFields: [...tab.formFields, { id: uuidv4(), key: "", value: "", type: "text", description: "" }]
    });
  },
  removeFormField: (id) => {
    const tab = get().tabs.find(t => t.id === get().activeTabId);
    if (!tab) return;
    get().updateActiveTab({
      formFields: tab.formFields.filter((field) => field.id !== id)
    });
  },
  updateFormField: (id, fieldName, newValue) => {
    const tab = get().tabs.find(t => t.id === get().activeTabId);
    if (!tab) return;
    get().updateActiveTab({
      // FIXED: Use type assertion to satisfy TypeScript's strict checking for computed property names
      formFields: tab.formFields.map((field) => {
        if (field.id === id) {
          // Temporarily assert the resulting object back to FormField
          return { ...field, [fieldName]: newValue } as FormField;
        }
        return field;
      })
    });
  },

  // URL Encoded Actions
  addUrlEncodedField: () => {
    const tab = get().tabs.find(t => t.id === get().activeTabId);
    if (!tab) return;
    get().updateActiveTab({
      urlEncodedFields: [...tab.urlEncodedFields, { id: uuidv4(), key: "", value: "", description: "" }]
    });
  },
  removeUrlEncodedField: (id) => {
    const tab = get().tabs.find(t => t.id === get().activeTabId);
    if (!tab) return;
    get().updateActiveTab({
      urlEncodedFields: tab.urlEncodedFields.filter((field) => field.id !== id)
    });
  },
  updateUrlEncodedField: (id, fieldName, newValue) => {
    const tab = get().tabs.find(t => t.id === get().activeTabId);
    if (!tab) return;
    get().updateActiveTab({
      urlEncodedFields: tab.urlEncodedFields.map((field) => field.id === id ? { ...field, [fieldName]: newValue } : field)
    });
  },

  // Header Actions
  addHeaderField: () => {
    const tab = get().tabs.find(t => t.id === get().activeTabId);
    if (!tab) return;
    get().updateActiveTab({
      headerFields: [...tab.headerFields, { id: uuidv4(), key: "", value: "", description: "" }]
    });
  },
  removeHeaderField: (id) => {
    const tab = get().tabs.find(t => t.id === get().activeTabId);
    if (!tab) return;
    get().updateActiveTab({
      headerFields: tab.headerFields.filter((field) => field.id !== id)
    });
  },
  updateHeaderField: (id, fieldName, newValue) => {
    const tab = get().tabs.find(t => t.id === get().activeTabId);
    if (!tab) return;
    get().updateActiveTab({
      headerFields: tab.headerFields.map((field) => field.id === id ? { ...field, [fieldName]: newValue } : field)
    });
  },

  // Reset Action
  resetActiveTab: () => {
    const activeId = get().activeTabId;
    const activeTab = get().tabs.find(t => t.id === activeId);
    if (!activeTab) return;
    const defaults = createNewTab();
    get().updateActiveTab({
      ...defaults,
      name: activeTab.name
    });
  }
}));

useTabsStore.setState(state => ({ activeTabId: state.tabs[0]?.id }));