import React, { Component } from "react";
import TypeBar from "./type-bar";
import Axios from "axios";

class DamageWhenAttacked extends Component {
    constructor(props){
        super(props)

        this.state = {
            typesData:[],
            loading:true
        }

        this.renderDamageBars = this.renderDamageBars.bind(this);

    }
    
    componentDidUpdate(prevProps){
        if(prevProps.types !== this.props.types){
            
            const requests = [];
            
            this.props.types.forEach( type => {
                requests.push(Axios.get(`https://pokeapi.co/api/v2/type/${type.type.name}`))
            });
            
            Promise.all(requests).then((res)=>{
                this.setState({
                    typesData:res,
                    loading:false
                })
            })
        }
    }

    renderDamageBars(){

        if(!this.state.loading){

            // Pokemon can have up to to types. Below values are type ones damage multipliers.
            const typeOneDoubleDamageValues =  this.state.typesData[0].data.damage_relations.double_damage_from.map( type  => ({name:type.name,multiplier:"2x"}) )
            const typeOneHalfDamageValues =  this.state.typesData[0].data.damage_relations.half_damage_from.map( type  => ({name:type.name,multiplier:"0.5x"}) )
            const typeOneNoDamageValues = this.state.typesData[0].data.damage_relations.no_damage_from.map( type  => ({name:type.name,multiplier:"0x"}) )
            console.log("double", typeOneDoubleDamageValues)
            console.log("half", typeOneHalfDamageValues)
            console.log("no", typeOneNoDamageValues)
            
            if(this.state.typesData.length !== 1){
                // If the pokemon has two types populate below arrays with their damage multipliers.
                let typeTwoDoubleDamageValues =  this.state.typesData[1].data.damage_relations.double_damage_from.map( type  => type.name )
                const typeTwoHalfDamageValues =  this.state.typesData[1].data.damage_relations.half_damage_from.map( type  => type.name )
                const typeTwoNoDamageValues = this.state.typesData[1].data.damage_relations.no_damage_from.map( type  => type.name )
                console.log("2double", typeTwoDoubleDamageValues)
                console.log("2half", typeTwoHalfDamageValues)
                console.log("2no", typeTwoNoDamageValues)

                
               let  quadDamageValues = []
              

                typeOneDoubleDamageValues.forEach((type)=>{
                    if(typeTwoDoubleDamageValues.includes(type.name)){
                        // if type.name occurs in both arrays add to quad damage array
                        quadDamageValues.push({name:type.name, multiplier:"4x"})

                        // remove this specific type from double damage array because it now deals quad damage.
                        const index = typeTwoDoubleDamageValues.indexOf(type.name)
                        typeTwoDoubleDamageValues.splice(index,1)

                        

                    }
                })

                console.log("quad values", quadDamageValues)
                console.log("dub values", typeTwoDoubleDamageValues)




                return null



            }

        



            
            //  const typeOne = this.state.typesData[0].data.name
             
            //  const typeOneDoubleDamageFrom = this.state.typesData[0].data.damage_relations.double_damage_from;
            //  const typeOneHalfDamageFrom = this.state.typesData[0].data.damage_relations.half_damage_from;
            //  const noDamageFrom = this.state.typesData[0].data.damage_relations.no_damage_from;
             
             
            // const oneDoubleDamage = typeOneDoubleDamageFrom.map((type)=>{
            //     return <TypeBar type={type.name} showChevron={false} multiplier="2x" colour={"#"+this.props.colours[type.name]} />
            // })

            // const oneHalfDamage = typeOneHalfDamageFrom.map((type)=>{
            //     return <TypeBar type={type.name} showChevron={false} multiplier="0.5x" colour={"#"+this.props.colours[type.name]} />
            // })

            // const noDamage = noDamageFrom.map((type)=>{
            //     return <TypeBar type={type.name} showChevron={false} multiplier="0x" colour={"#"+this.props.colours[type.name]} />
            // })
             
             
             
             
             
             
            //  const typebars = [...oneDoubleDamage, ...oneHalfDamage, ...noDamage]
            //  console.log("typebars", typebars)
              
 
        
 
            // if(this.state.typesData.length !== 1 ){
            //     const typeTwoDoubleDamageFrom = this.state.typesData[1].data.damage_relations.double_damage_from;
            //     const typeTwoHalfDamageFrom = this.state.typesData[1].data.damage_relations.half_damage_from;
            //     const typeTwoNoDamageFrom = this.state.typesData[1].data.damage_relations.no_damage_from;

               


            //     console.log("dubs", typeTwoDoubleDamageFrom)
            //     console.log("half", typeTwoHalfDamageFrom)
            //     console.log("no", typeTwoNoDamageFrom)
                
            //     const quadDamage = typeTwoDoubleDamageFrom.map((type, index) => {
                    
            //     })





            // }
            //  return(
            //     <div>
            //         {
            //          typebars.map((type)=>{
            //              return type
            //          })
            //         }
            //     </div>
            //  )
            
 
 
 
            


        }
        
        


        return null;
    }


    render(){
        
        return(
            <div className="damage-when-attacked">
                
                <this.renderDamageBars />
            </div>
        )
    }


}

export default DamageWhenAttacked;