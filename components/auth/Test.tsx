import React, { useEffect } from 'react'

const Test = () => {
    
    interface QuestionsProps {
        title: String;
        answers: Array<String>;
    }
    

    let sexologia = 0;
    let educativo = 0;
    let clinica = 0;
    let familiar = 0;
    let sports = 0;
    let org =0;
    let socio = 0;
    let neupsi = 0;

    const resultadofinal = () => {

        if(neupsi != 0){
            setResultado('Neuropsicologia')
            return
        }
        if(sports != 0){
            setResultado('Psicologia del deporte')
            return
        }
        if(org != 0){
            return
        }


    }

     
    const [suenio, setSuenio] = React.useState('null')
    const [sexo, setSexo] = React.useState('null')
    const [arrecho, setArrechera] = React.useState('null')
    const [deporte, setDeporte] = React.useState('null')
    const [hijos, setHijos] = React.useState('null')
    const [parejas, setParejas] = React.useState('null')
    const [trabajo, setTrabajo] = React.useState('null')
    const [familia, setFamilia] = React.useState('null')
    const [violento, setViolento] = React.useState('null')
    const [monchi, setMonchi] = React.useState('null')
    const [caliweba, setCaliweba] = React.useState('null')
    const [social, setSocial] = React.useState('null')
    const [student, setStudent] = React.useState('null')
    const [neuro, setNeuro] = React.useState('null')

    const [resultado, setResultado] = React.useState('null')

    useEffect(() => {
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (suenio === 'null' || neuro === 'null' || social === 'null' || sexo === 'null' || arrecho === 'null' || deporte === 'null' || hijos === 'null' || parejas === 'null' || student === 'null' || trabajo === 'null' || familia === 'null' || violento === 'null' || monchi === 'null' || caliweba === 'null'){
            alert('Por favor responda cada pregunta.')
        }else{
            switch(String(suenio)){

                case 'Irregular':  
                clinica= clinica +1
                break;

                case 'Muy irregular':
                clinica= clinica +2
                break;
            }
            switch(String(sexo)){

                case 'Si':
                sexologia= sexologia +1
                break;

            }
            switch(String(arrecho)){

                case 'Si':
                sexologia= sexologia +1
                break;

            }
            switch(String(social)){


                case 'Poco sociable':
                socio = socio +1
                break;

                case 'Raramente sociable':
                socio = socio +2
                clinica = clinica +1
                break;
            }

            switch(String(deporte)){

                case 'Si':
                sports= sports +1
                break;

            }

            switch(String(hijos)){

                case 'Si':
                familiar= familiar +1
                break;

            }

            switch(String(parejas)){

                case 'Si':
                sexologia= sexologia +1
                break;

            }
            0
            switch(String(trabajo)){

                case 'Muy estresante':  
                org = org +2
                break;

                case 'Moderadamente estresante':
                familiar = familiar +1
                org = org +1
                break;


                case 'Relajado':
                familiar = familiar +1
                break;
            }
            switch(String(neuro)){

                case 'Si':
                neupsi= neupsi +1
                break;

            }
            switch(String(student)){

                case 'Si':
                educativo= educativo +1
                if(org =0){
                    educativo =educativo+2
                }
                org=0
                break;



            }
            switch(String(familia)){

                case 'Si':
                clinica= clinica +1
                socio = socio+1
                break;

            }
            
            switch(String(violento)){

                case 'Si':
                clinica= clinica +1
                break;

            }
            switch(String(monchi)){

                case 'Si':
                clinica= clinica +1
                break;

            }
            switch(String(caliweba)){

                case 'Si':
                clinica= clinica +1
                break;

            }
            
        }
    }

    

    return(
        <form onSubmit={onSubmit}>
        <div className="grid grid-cols-6 grid-rows-6 gap-3 bg-cover bg-center bg-no-repeat h-screen" 
        style={{backgroundImage: `url('/assets/img/fototest.png')`}}>

            <div className="col-span-6">
            </div>

            <div className="col-start-2 col-span-4 text-4xl text-white text-center p-2 mb-3 ">
                <p>Al rellenar este quiz, podremos recomendarle a los profesionales mas indicados para su situacion.</p> 
            </div>

            <div className="col-start-2 col-span-4 row-span-3 cool scrul p-10 rounded">
                <div className="text-xl text-center">

                    <div className="p-2"> 

                        <p className="pb-2">¿Practica usted algun deporte profesionalmente?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setDeporte(String(e.target.value))}>
                            <option selected value="null">  </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="p-2"> 

                        <p className="pb-2">¿Tiene usted hijos?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setHijos(String(e.target.value))}>
                            <option selected value="null">  </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="p-2"> 

                        <p className="pb-2">¿Tiene usted pareja?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setParejas(String(e.target.value))}>
                            <option selected value="null">   </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="p-2"> 

                        <p className="pb-2">Su trabajo, responsabilidades y/o ambiente de estudio es: </p>
                        <select className="cool w-full text-center mt-1" onChange={e => setTrabajo(String(e.target.value))}>
                            <option selected value="null">   </option>
                            <option value="Si">Muy estresante</option>
                            <option value="No">Moderadamente estresante</option>
                            <option value="No">Poco estresante</option>
                            <option value="No">Relajado</option>

                        </select>

                    </div>

                    <div className="p-2"> 

                        <p className="pb-2">Su ritmo de sueño es:</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setSuenio(String(e.target.value))}>
                            <option selected value="null">   </option>
                            <option value="Bastante regular">Bastante regular</option>
                            <option value="Regular">Regular</option>
                            <option value="Irregular">Irregular</option>
                            <option value="Muy irregular">Muy irregular</option>
                        </select>

                    </div>
                    <div className="p-2"> 

                        <p className="pb-2">¿Suele tener problemas al tener relaciones?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setSexo(String(e.target.value))}>
                            <option selected value="null">   </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>
                    <div className="p-2"> 

                        <p className="pb-2">Usted se considera:</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setArrechera(String(e.target.value))}>
                            <option selected value="null">   </option>
                            <option value="Bastante facil de enojar.">Bastante facil de enojar.</option>
                            <option value="Moderadamente enojable.">Moderadamente enojable.</option>
                            <option value="Enojable en ocasiones">Enojable en ocasiones</option>
                            <option value="Calmado.">Calmado.</option>
                        </select>

                    </div>
                    <div className="p-2"> 

                        <p className="pb-2">¿Su familia y/o amistades le ha sugerido que reciba ayuda profesional?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setFamilia(String(e.target.value))}>
                            <option selected value="null">    </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>
                    <div className="p-2"> 

                        <p className="pb-2">¿Se considera usted una persona violenta?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setViolento(String(e.target.value))}>
                            <option selected value="null">    </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>
                    <div className="p-2"> 

                        <p className="pb-2">¿Tiene problemas con falta del apetito?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setMonchi(String(e.target.value))}>
                            <option selected value="null">    </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>
                    <div className="p-2"> 

                        <p className="pb-2">¿Ha sufrido lesiones cerebrales?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setNeuro(String(e.target.value))}>
                            <option selected value="null">    </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="p-2"> 

                        <p className="pb-2">¿Es un estudiante actualmente?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setStudent(String(e.target.value))}>
                            <option selected value="null">    </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>

                    <div className="p-2"> 

                        <p className="pb-2">¿Tiene problemas de motivacion?</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setCaliweba(String(e.target.value))}>
                            <option selected value="null">   </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>

                    </div>
                    <div className="p-2"> 

                        <p className="pb-2">Usted se considera:</p>
                        <select className="cool w-full text-center mt-1" onChange={e => setSocial(String(e.target.value))}>
                            <option selected value="null">    </option>
                            <option value="Bastante sociable">Bastante sociable</option>
                            <option value="Moderadamente sociable">Moderadamente sociable</option>
                            <option value="Poco sociable">Poco sociable</option>
                            <option value="Raramente sociable">Raramente sociable</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-3 col-start-3 col-span-2">
                <div className=" col-start-4">
                    <button type="submit"  className=" border-black h-10 w-24 text-center 
                     transition duration-300 ease-in-out bg-purple-600 hover:bg-purple-800 hover:border-purple-800 border-2 border-purple-600 rounded cursor-pointer mr-4">Enviar</button>
                </div>      
            </div>

        </div>
        </form>
    )
}
export default Test