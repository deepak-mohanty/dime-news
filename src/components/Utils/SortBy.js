
import React from 'react';

const SortBy = (arr) => {
    const sortedDataList = [...arr]
    return sortedDataList.sort((a,b) => {
        if(a.name > b.name){
            return -1
        }
        else{
            return 1
        }
    })
}

export default SortBy;