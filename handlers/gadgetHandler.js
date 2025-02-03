import { query } from "../config/db.js";
export async function getGadgets(req, res) {
    try {
        const result = await query('SELECT * FROM gadgets');
        const gadgetsInsertedWithProb = result.rows.map(gadget => ({
            ...gadget,
            mission_success_probability: Math.floor(Math.random() * 101) + '%',
        }));

        res.json(gadgetsInsertedWithProb);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}

export async function addGadget(req, res) {
    const { name, status } = req.body;
    const codename = generateCodename();

    try {
        const result = await query(
            'INSERT INTO gadgets (name, status, codename) VALUES ($1, $2, $3) RETURNING *',
            [name, status, codename]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}
function generateCodename() {
    const codenames = ["The Nightingale", "The Kraken", "The Chhota Shakeel", "The Bada Shakeel", "The Medium Shakeel"];
    const randomIndex = Math.floor(Math.random() * codenames.length);
    return codenames[randomIndex];
}


export async function updateGadget(req, res) {
    const { name, status, id } = req.body;

    try {
        const result = await query(
            'UPDATE gadgets SET name = $1, status = $2 WHERE id = $3 RETURNING *',
            [name, status, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}

export async function deleteGadget(req, res) {
    // This does not actually delete data just adds decommisioned status and sets decommision time
    const { id } = req.body;
    const timestamp = new Date().toISOString();

    try {
        const result = await query(
            'UPDATE gadgets SET status = $1, decommissioned_at = $2 WHERE id = $3 RETURNING *',
            ['Decommissioned', timestamp, id]
        );
        res.json({ message: "Gadget decommissioned", gadget: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}

export async function selfDestructGadget(req, res) {
    const { id } = req.params;
    const confirmationCode = generateConfirmationCode(); // Generate confirm code which is 123456

    try {
        // check if req.body has 123456 as confirmationCode
        if (req.body.confirmationCode !== confirmationCode) {
            return res.status(400).json({ message: "Invalid confirmation code" });
        }

        // Perform self-destruct =>(mark gadget as destroyed)
        const result = await query(
            'UPDATE gadgets SET status = $1 WHERE id = $2 RETURNING *',
            ['Destroyed', id]
        );
        res.json({ message: "Gadget destroyed", gadget: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}

function generateConfirmationCode() {
    return 123456;
}

export async function getGadgetsByStatus(req, res) {
    const { status } = req.query;

    try {
        const result = await query('SELECT * FROM gadgets WHERE status = $1', [status]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}