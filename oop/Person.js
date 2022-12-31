class Person {
    Personality = 'Unknown';
    /**
     * getPeronality
 :string    */
    getPeronality() {
        return this.Personality;
    }
    setPersonality(num) {
        if (num === 1) {
            this.Personality = 'Extrovert';
        }
        else if (num === 2) {
            this.Personality = 'Introvert';
        }
        else {
            this.Personality = 'You are a mystery to us';
        }
    }
}
export { Person };
