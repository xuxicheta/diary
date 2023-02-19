import { Message } from './message.interface';

const RECORDS = 'records';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const openDBRequest: IDBOpenDBRequest = indexedDB.open('diary', 5);

    openDBRequest.addEventListener('error', reject);

    openDBRequest.addEventListener('success', () => {
      resolve(openDBRequest.result);
    });

    openDBRequest.addEventListener('upgradeneeded', (e: IDBVersionChangeEvent) => {
      console.log('upgradeneeded', e);
      // e.currentTarget.
      openDBRequest.result.deleteObjectStore(RECORDS);
      openDBRequest.result.createObjectStore(RECORDS, { keyPath: 'date' });
    });
  });
}

const openedDb = openDb();

export function addRecord(record: Message) {
  return openedDb
    .then(db => {
      return new Promise<Event>((resolve, reject) => {
        const request = db.transaction([RECORDS], 'readwrite').objectStore(RECORDS).add(record);

        request.addEventListener('success', resolve);
        request.addEventListener('error', reject);
      });
    })
    .then(evt => record);
}

export function getRecord({ date }: Partial<Message>) {
  if (date == null) {
    throw new Error('no date');
  }

  return openedDb.then(db => {
    return new Promise<Event>((resolve, reject) => {
      const request = db.transaction([RECORDS], 'readwrite').objectStore(RECORDS).get(date);

      request.addEventListener('success', resolve);
      request.addEventListener('error', reject);
    });
  });
}

export function deleteRecord({ date }: Partial<Message>) {
  if (date == null) {
    throw new Error('no date');
  }

  return openedDb.then(db => {
    return new Promise<Event>((resolve, reject) => {
      const request = db.transaction([RECORDS], 'readwrite').objectStore(RECORDS).delete(date);

      request.addEventListener('success', resolve);
      request.addEventListener('error', reject);
    });
  });
}

export function getAllRecords<T>(query?: IDBValidKey | IDBKeyRange | null, count?: number) {
  return openedDb
    .then(db => {
      return new Promise<Event>((resolve, reject) => {
        const request = db.transaction([RECORDS], 'readonly').objectStore(RECORDS).getAll(query, count);

        request.addEventListener('success', resolve);
        request.addEventListener('error', reject);
      });
    })
    .then((evt: Event) => (evt.target as IDBRequest<Message[]>).result);
}
