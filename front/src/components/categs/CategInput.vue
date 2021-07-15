<template>
    <div>
        
        <b-form-group
            id="input-group-11"
            label="Category:"
            label-for="input-11">
         
            <b-form-select
            id="input-11"
            v-model="category"
            :options="setCategNames"                
            @change="catVal"
                        
            ></b-form-select>
        </b-form-group> 
        <div class="input-group mb-3">
             <div class="input-group-prepend">
                <label class="input-group-text" for="inpSelect">Categories</label>
            </div>
            <select class="custom-select" id="inputSelect">
                <option selected>Choose a category,please</option>
                <option v-for="opt in setCategNames" :key="opt.id" value="opt.id">{{opt.text}}</option>
                
            </select>
        </div>
        
      </div>
</template>         
          

<script>
    export default {
        name:"AppCategInput",
        props:{
        placeholder: { type: String },
        setCategNames: { type: Array }
        },         
        data(){
            return {
                category:'',
                // selected: null,
                // options: [
                // { value: null, text: 'Please select an option' },
                // { value: 'a', text: 'This is First option' },
                // { value: 'b', text: 'Selected Option', disabled: true },
                // {
                //     label: 'Grouped options',
                //     options: [
                //     { value: { C: '3PO' }, text: 'Option with object value' },
                //     { value: { R: '2D2' }, text: 'Another option with object value' }
                //     ]
                // }
                // ]
                
            }
        },
        methods:{
            catVal(){
                // console.log("category is",this.category)
                this.$emit('getCategw', this.category);
            }
        },
        
    }
</script>