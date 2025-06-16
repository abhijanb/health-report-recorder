import { router, useForm } from '@inertiajs/react'
import React from 'react'

const email = () => {
    const {post,errors,processing,setData,data} = useForm();
    const submit = (e)=>{
e.preventDefault();
        post(route('email.send'),{
            onFinish : () =>{
                console.log("finished")
            }
        })
    }
  return (
    <div>
        <form onSubmit={submit}>
<input type="text" name="email" id="email" placeholder='email' onChange={(e)=>setData('email',e.target.value)} />
<button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default email