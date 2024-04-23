export class IndexProvider {
    #todoIdIndentifier = 'todoId';
    #storeGateway;

    constructor(storeGateway){
        this.#storeGateway = storeGateway;
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