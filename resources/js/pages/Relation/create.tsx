import InputError from '@/components/input-error'
import { Input } from '@/components/ui/input'
import { useForm } from '@inertiajs/react';
import React from 'react'

//  get a code and if the entered code matched then add that user to the relation db

const create = () => {
      const { post, errors, data, setData, processing, reset } = useForm({
        "relation" : ""
      });
    
  return (
    <div>
        
<h1>enter the code </h1>
<Input 
required
value={data.relation}
onChange={(e)=>setData("relation",e.target.value)}
/>
<InputError message={errors.relation}/>
    </div>
  )
}

export default create