import Vue from 'vue';
import test from './test'

function open(propsData){
    //返回一个compoenets对象
    const testCom = Vue.extend(test)
    return new testCom({
        el:document.createElement("div"),
        propsData
    })
}

export default{
    open(param){
        return open(param)
    }
}