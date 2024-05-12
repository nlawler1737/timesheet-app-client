import { fakeFetch, mockData } from "./mock";

/**
 * @typedef {{id: number, name: string}} Project * 
 * @typedef {{id: string, start: string, end: string, project: string, summary: string}} Entry
 */

/**
 * Get all entries
 * @returns {Promise<{success: boolean, message: string, data: Entry[]}>}
 */
export function getEntries() {
  return fakeFetch([
    { message: "successfully fetched entries", data: mockData.entries },
    { message: "successfully fetched entries", data: [] },
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

/**
 * Get all projects
 * @returns {Promise<{success: boolean, message: string, data: Project[]}>}
 */
export function getProjects() {
  return fakeFetch([
    { message: "successfully fetched projects", data: mockData.projects },
    { message: "successfully fetched projects", data: [] },
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

/**
 * Add entry
 * @param {Entry} entry
 * @returns {Promise<{success: boolean, message: string}>}
 */
export function addEntry(entry) {
  return fakeFetch([
    { message: "successfully added entry" },
    { message: "successfully added entry" },
  ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}
