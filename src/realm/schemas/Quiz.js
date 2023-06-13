import Realm from "realm";

class Quizes extends Realm.Object { }

Quizes.schema = {
    name: "Quiz",
    properties: {
        id: "string",
        name: "string",
        description: "string",
        unlockCost: "int",
        unlocked: "bool",
        image: "string"
    },
    primaryKey: "id"
}

export default Quizes;
