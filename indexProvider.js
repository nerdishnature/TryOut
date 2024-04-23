import { StoreGateway } from "./storeGateway.js";

export class IndexProvider {
    #todoIdIndentifier = 'todoId';
    #storeGateway;

    constructor(){
        this.#storeGateway = new StoreGateway();
    }

    getNextId() {
        const storedValue = this.#storeGateway.getStoreData(this.#todoIdIndentifier);
        const numericStoredValue = Number(storedValue);
        if (isNaN(numericStoredValue)) {
            numericStoredValue = 0;
        }

        this.#updateStoredIndex(numericStoredValue);
        return numericStoredValue;
    }

    #updateStoredIndex(number) {
        this.#storeGateway.setStoredValue(this.#todoIdIndentifier, number++);
    }
}