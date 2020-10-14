import { table, minifyRecord } from "./utils/airtable";
import OwnsRecord from "./middleware/owns-record";

export default OwnsRecord(async (req, res) => {
  const { id, fields } = req.body;
  try {
    const updated = await table.update([
      {
        id,
        fields,
      },
    ]);

    const data = updated.map(minifyRecord);

    res.statusCode = 200;
    res.json(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong !" });
  }
});
