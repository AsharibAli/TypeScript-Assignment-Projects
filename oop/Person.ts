class Person{
    private Personality:string='Unknown';

    /**
     * getPeronality
 :string    */
    public getPeronality():string {
        return this.Personality;
    }
    public setPersonality(num:number){
        if(num===1){
            this.Personality='Extrovert';
        }else if(num===2){
            this.Personality='Introvert';
        }else{
            this.Personality='You are a mystery to us';
        }
    }
}

export {Person};