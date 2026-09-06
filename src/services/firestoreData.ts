import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Project, Roadmap, Lab } from '../types';
import { projects as initialProjects } from '../data/projects';
import { roadmaps as initialRoadmaps } from '../data/roadmaps';
import { labs as initialLabs } from '../data/labs';

const PROJECTS_COLLECTION = 'projects';
const ROADMAPS_COLLECTION = 'roadmaps';
const LABS_COLLECTION = 'labs';

/**
 * Fetch all projects from Firestore, falling back to static projects if empty
 */
export async function fetchProjectsFromFirestore(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
    if (querySnapshot.empty) {
      return initialProjects;
    }
    const list: Project[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Project);
    });
    return list;
  } catch (error) {
    console.warn('Firestore fetch projects error, using default static projects:', error);
    return initialProjects;
  }
}

/**
 * Fetch a single project by slug
 */
export async function fetchProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Project;
    }
  } catch (error) {
    console.warn(`Could not get project ${slug} from Firestore:`, error);
  }
  return initialProjects.find((p) => p.slug === slug);
}

/**
 * Save or update a project in Firestore
 */
export async function saveProjectToFirestore(project: Project): Promise<void> {
  const docId = project.slug || project.id;
  const path = `${PROJECTS_COLLECTION}/${docId}`;
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, docId);
    await setDoc(docRef, {
      ...project,
      id: docId,
      slug: project.slug,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Delete a project from Firestore
 */
export async function deleteProjectFromFirestore(docId: string): Promise<void> {
  const path = `${PROJECTS_COLLECTION}/${docId}`;
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Fetch all roadmaps from Firestore, falling back to static roadmaps if empty
 */
export async function fetchRoadmapsFromFirestore(): Promise<Roadmap[]> {
  try {
    const querySnapshot = await getDocs(collection(db, ROADMAPS_COLLECTION));
    if (querySnapshot.empty) {
      return initialRoadmaps;
    }
    const list: Roadmap[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Roadmap);
    });
    return list;
  } catch (error) {
    console.warn('Firestore fetch roadmaps error, using default static roadmaps:', error);
    return initialRoadmaps;
  }
}

/**
 * Fetch a single roadmap by slug
 */
export async function fetchRoadmapBySlug(slug: string): Promise<Roadmap | undefined> {
  try {
    const docRef = doc(db, ROADMAPS_COLLECTION, slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Roadmap;
    }
  } catch (error) {
    console.warn(`Could not get roadmap ${slug} from Firestore:`, error);
  }
  return initialRoadmaps.find((r) => r.slug === slug);
}

/**
 * Save or update a roadmap in Firestore
 */
export async function saveRoadmapToFirestore(roadmap: Roadmap): Promise<void> {
  const docId = roadmap.slug || roadmap.id;
  const path = `${ROADMAPS_COLLECTION}/${docId}`;
  try {
    const docRef = doc(db, ROADMAPS_COLLECTION, docId);
    await setDoc(docRef, {
      ...roadmap,
      id: docId,
      slug: roadmap.slug,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Delete a roadmap from Firestore
 */
export async function deleteRoadmapFromFirestore(docId: string): Promise<void> {
  const path = `${ROADMAPS_COLLECTION}/${docId}`;
  try {
    await deleteDoc(doc(db, ROADMAPS_COLLECTION, docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Seed all initial curated projects, roadmaps, and labs into Firestore
 */
export async function seedAllDefaultsToFirestore(): Promise<{
  projectsCount: number;
  roadmapsCount: number;
  labsCount: number;
}> {
  let projectsCount = 0;
  let roadmapsCount = 0;
  let labsCount = 0;

  for (const proj of initialProjects) {
    await saveProjectToFirestore(proj);
    projectsCount++;
  }

  for (const rm of initialRoadmaps) {
    await saveRoadmapToFirestore(rm);
    roadmapsCount++;
  }

  for (const lab of initialLabs) {
    await saveLabToFirestore(lab);
    labsCount++;
  }

  return { projectsCount, roadmapsCount, labsCount };
}

/**
 * Fetch all labs from Firestore, falling back to static labs if empty
 */
export async function fetchLabsFromFirestore(): Promise<Lab[]> {
  try {
    const querySnapshot = await getDocs(collection(db, LABS_COLLECTION));
    if (querySnapshot.empty) {
      return initialLabs;
    }
    const list: Lab[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Lab);
    });
    return list;
  } catch (error) {
    console.warn('Firestore fetch labs error, using default static labs:', error);
    return initialLabs;
  }
}

/**
 * Fetch a single lab by slug
 */
export async function fetchLabBySlug(slug: string): Promise<Lab | undefined> {
  try {
    const docRef = doc(db, LABS_COLLECTION, slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Lab;
    }
  } catch (error) {
    console.warn(`Could not get lab ${slug} from Firestore:`, error);
  }
  return initialLabs.find((l) => l.slug === slug);
}

/**
 * Save or update a lab in Firestore
 */
export async function saveLabToFirestore(lab: Lab): Promise<void> {
  const docId = lab.slug || lab.id;
  const path = `${LABS_COLLECTION}/${docId}`;
  try {
    const docRef = doc(db, LABS_COLLECTION, docId);
    await setDoc(docRef, {
      ...lab,
      id: docId,
      slug: lab.slug,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Delete a lab from Firestore
 */
export async function deleteLabFromFirestore(docId: string): Promise<void> {
  const path = `${LABS_COLLECTION}/${docId}`;
  try {
    await deleteDoc(doc(db, LABS_COLLECTION, docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
