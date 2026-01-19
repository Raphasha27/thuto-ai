import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SESSIONS: '@flowstate_sessions',
  TASKS: '@flowstate_tasks',
  SETTINGS: '@flowstate_settings',
  STATS: '@flowstate_stats',
};

export const saveSessions = async (sessions) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
};

export const loadSessions = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading sessions:', error);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const loadTasks = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const loadSettings = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      focusDuration: 25,
      shortBreak: 5,
      longBreak: 15,
      autoStartBreak: false,
      soundEnabled: true,
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      focusDuration: 25,
      shortBreak: 5,
      longBreak: 15,
      autoStartBreak: false,
      soundEnabled: true,
    };
  }
};
