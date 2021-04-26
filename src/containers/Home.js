import React from 'react'
import store from '../Store'
import {connect} from 'react-redux'
function Home({}) {

    
    return (
        <div className="text-center">
            <h5 mt-5>HOME</h5>
        </div>
    )
}



// console.log("the store items is",store.getState())

export default Home
