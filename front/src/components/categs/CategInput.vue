<template>
    <div>        
        <b-form-group
            id="input-group-11"
            label="Category:"
            label-for="input-11" class="text-left">
                    
            <b-form-select
            id="input-11"
            v-model="category"
            :options="setCategNames"                
            @change="catVal">                       
            
            </b-form-select>
        </b-form-group> 
        <!-- <div class="input-group mb-3">
             <div class="input-group-prepend">
                <label class="input-group-text" for="inpSelect">Categories</label>
            </div>
            <select class="custom-select" id="inputSelect">
                <option selected>Choose a category,please</option>
                <option v-for="opt in setCategNames" :key="opt.id" :value="opt.value">{{opt.text}}</option>
                
            </select>
        </div> -->
        
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
                
            }
        },
        methods:{
            catVal(){
                // this.category 'number'
                this.$emit('getCateg', this.category);
            }
        },
        
    }
</script>