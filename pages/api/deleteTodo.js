import { table, minifyRecord } from "./utils/airtable";
import OwnsRecord from "./middleware/owns-record";

export default OwnsRecord(async (req, res) => {
  const { id } = req.body;
  try {
    const deleted = await table.destroy([id]);
    const data = deleted.map(minifyRecord);

    res.statusCode = 200;
    res.json(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong !" });
  }
});
