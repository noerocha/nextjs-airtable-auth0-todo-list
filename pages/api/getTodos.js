import { table, minifyRecord } from "./utils/airtable";
import auth0 from "./utils/auth0";

export default auth0.requireAuthentication(async (req, res) => {
  const session = await auth0.getSession(req);
  try {
    const records = await table
      .select({
        filterByFormula: `userId = '${session.user.sub}'`,
      })
      .firstPage();

    const data = records.map(minifyRecord);
    res.statusCode = 200;
    res.json(data);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong !" });
  }
});
