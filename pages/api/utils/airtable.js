import AirTable from "airtable";

const base = new AirTable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const minifyRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }

  return {
    id: record.id,
    fields: record.fields,
  };
};

export { table, minifyRecord };
