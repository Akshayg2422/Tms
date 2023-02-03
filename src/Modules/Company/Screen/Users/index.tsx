import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Card, Divider, Button, HomeContainer } from '@Components'
import { UserItem } from '@Modules'
import { getEmployee } from '@Redux'
function User() {
    const data=[
        {id:1,name:"Hari",phone:"7348544304", email:"hari@gmail.com"},
        {id:2,name:"karan",phone:"7348544304", email:"karan@gmail.com"},
        {id:3,name:"gladwin",phone:"7348544304", email:"glad@gmail.com"},

]
const dispatch = useDispatch()
const { getEmployeeData,addEmployeeData } = useSelector( (state: any) => state.CompanyReducer);

useEffect(() => {
    const params = {q: ''};
    dispatch(getEmployee({params}));
}, []);
    return (
        <div> 
            <HomeContainer>
            <div className='text-right'>
                <Button text={'Add User'} />
            </div>
            <Card className='mt-3'>
                {
                    data && data.length >0 && data.map((user:any,index:number)=>{
                        return(
                            <>
                               <UserItem item={user}/>
                              {index !== data.length-1  && <Divider/> }
                            </>
                        )
                    })
         
                }
            </Card>
        </HomeContainer>

        </div>
    )
}
export { User }