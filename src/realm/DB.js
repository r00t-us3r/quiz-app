import Realm from "realm"
import Quiz from "./schemas/Quiz";

export default new Realm(
    {
        schema: [Quiz],
        schemaVersion: 2,
        deleteRealmIfMigrationNeeded: true
    }
)