import { table } from "./utils/airtable";
import auth0 from "./utils/auth0";

export default auth0.requireAuthentication(async (req, res) => {
  const { description } = req.body;
  const { user } = await auth0.getSession(req);

  try {
    const created = await table.create([
      {
        fields: { description, userId: user.sub },
      },
    ]);

    const data = {
      id: created[0].id,
      fields: created[0].fields,
    };

    res.statusCode = 200;
    res.json(data);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: "Something went wrong !" });
  }
});
