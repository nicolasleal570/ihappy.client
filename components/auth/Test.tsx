import React, { useEffect } from 'react'
import { getSpecialty, getUsers } from '../../utils/endpoints';
import Axios from 'axios';


const Test = () => {

    interface Psychologists {
        name: String;
        imgUrl: string;
    }

    const Psychologists = ({ name, imgUrl }: Psychologists) => (
        <div className='container'>
            <div className="flex flex-col">
                <img src={imgUrl} className="w-48 ml-10" alt="Doctors" />
                <h3 className="font-bold capitalize ml-20">{name}</h3>
            </div>
        </div>
    );


    let educativo = 0;
    let clinica = 0;
    let familiar = 0;
    let sports = 0; //
    let org = 0; //
    let socio = 0;
    let neupsi = 0; //
    let partner = 0; //

    let outcome: String;

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



    const [specialty, setSpecialty] = React.useState<any>([]) //Este trae todas las especialidades 
    const [psico, setPsico] = React.useState<any>([])     //Este muestra los que quiere el usuario 


    const [resultado, setResultado] = React.useState('null')
    const [res2, setRes2] = React.useState('')

    const psica = psico.map((element: any) => (
        <Psychologists
            name={element.slug}
            imgUrl={element.avatar}
        />
    ))

    const buscarPsi = () => {
        var temp: Array<any> = [];

        console.log(temp.length);

        for (let index = 0; index < psico.length; index++) {

            if (psico[index].role?.identification == 'psicologo') {




                for (let ind = 0; ind < psico[index].speciality.length; ind++) {
                    console.log(outcome);
                    console.log('entre al for two');
                    console.log(psico[index].speciality[ind].name);
                    if (psico[index].speciality[ind].name === outcome) {
                        console.log(psico[index]);
                        temp[temp.length] = psico[index];
                    }

                }



            }



        }

        console.log(temp);

        setPsico(temp);
    }

    const resultadofinal = () => {

        console.log('furula')
        if (neupsi != 0) {
            setResultado('Neuro Pediatra')
            setRes2('Neuro Pediatra')
            console.log(resultado)
            return
        }
        if (sports != 0) {
            setResultado('Psicologia del deporte')
            setRes2('Psicologia del deporte')

            return
        }
        if (org != 0) {
            setResultado('Psicologia organizacional')
            setRes2('Psicologia organizacional')
            return
        }
        let q = []
        q.push(educativo)
        q.push(clinica)
        q.push(familiar)
        q.push(partner)
        q.push(socio)
        let r = Math.max.apply(null, q)
        let index = q.indexOf(r)
        switch (index) {
            case 0:
                setResultado('Psicologia educativa')
                setRes2('Psicologia educativa')
                break;
            case 1:
                setResultado('Psicologo Clinico')
                setRes2('Psicologo Clinico')
                break;
            case 2:
                setResultado('Psicologia familiar')
                setRes2('Psicologia familiar')
                break;
            case 3:
                setResultado('Psicologia de parejas')
                setRes2('Psicologia de parejas')
                break;
            case 4:
                setResultado('Psicologia social')
                setRes2('Psicologia social')
                break;
        }
        console.log(resultado)


    }

    useEffect(() => {
    outcome = resultado;
    })

    useEffect(() => {
        Axios.get(getSpecialty)
            .then(response => {
                const data_role = response.data.data;

                console.log(data_role);
                setSpecialty(data_role);

            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                console.log(e);
            })
    }, [])

    useEffect(() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }


        Axios.get(getUsers, config)
            .then(response => {
                const data_role = response.data.data;
                const data_real = [];

                for (let index = 0; index < data_role.length; index++) {

                    if (data_role[index].role?.identification == 'psicologo') {

                        console.log(data_role[index]);



                        data_real[data_real.length] = data_role[index]



                    }



                }

                console.log(data_real);
                setPsico(data_real);

            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                console.log(e);
            })

    }, [])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (suenio === 'null' || neuro === 'null' || social === 'null' || sexo === 'null' || arrecho === 'null' || deporte === 'null' || hijos === 'null' || parejas === 'null' || student === 'null' || trabajo === 'null' || familia === 'null' || violento === 'null' || monchi === 'null' || caliweba === 'null') {
            alert('Por favor responda cada pregunta.')
        } else {
            switch (String(suenio)) {

                case 'Irregular':
                    clinica = clinica + 1
                    break;

                case 'Muy irregular':
                    clinica = clinica + 1
                    break;
            }
            switch (String(sexo)) {

                case 'Si':
                    partner = partner + 2
                    break;

            }
            switch (String(arrecho)) {


                case 'Bastante facil de enojar':
                    familiar = familiar + 1
                    socio = socio + 2
                    clinica = clinica + 1
                    break;

                case 'Moderadamente enojable':
                    socio = socio + 1
                    break;


            }
            switch (String(social)) {


                case 'Poco sociable':
                    socio = socio + 1
                    break;

                case 'Raramente sociable':
                    socio = socio + 2
                    clinica = clinica + 1
                    break;
            }

            switch (String(deporte)) {

                case 'Si':
                    sports = sports + 1
                    break;

            }

            switch (String(hijos)) {

                case 'Si':
                    familiar = familiar + 1
                    break;

            }

            switch (String(parejas)) {

                case 'Si':
                    partner = partner + 1
                    break;

                case 'No':
                    partner = 0
                    break;

            }

            switch (String(trabajo)) {

                case 'Muy estresante':
                    org = org + 2
                    break;

                case 'Moderadamente estresante':
                    org = org + 1
                    break;


                case 'Relajado':
                    familiar = familiar + 1
                    break;
            }
            switch (String(neuro)) {

                case 'Si':
                    neupsi = neupsi + 1
                    break;

            }
            switch (String(student)) {

                case 'Si':
                    educativo = educativo + 1
                    if (org = 0) {
                        educativo = educativo + 3
                    }
                    educativo = 0
                    org = 0
                    break;



            }
            switch (String(familia)) {

                case 'Si':
                    familiar = familiar + 1
                    break;

            }

            switch (String(violento)) {

                case 'Si':
                    clinica = clinica + 1
                    socio = socio + 1
                    break;

            }
            switch (String(monchi)) {

                case 'Si':
                    clinica = clinica + 1
                    break;

            }
            switch (String(caliweba)) {

                case 'Si':
                    clinica = clinica + 1
                    break;

            }

            resultadofinal();
            outcome = resultado;
            buscarPsi();

        }
    }



    return (
        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-6 grid-rows-6 gap-3 bg-cover bg-center bg-no-repeat h-screen"
                style={{ backgroundImage: `url('/assets/img/fototest.png')` }}>

                <div className="col-span-6">
                </div>
                <div className="grid grid-cols-6 grid-rows-5 gap-3  col-span-6 row-span-5">
                    {resultado === 'null'
                        ? <div className="grid grid-cols-6 grid-rows-5 gap-3 col-span-6 row-span-5">

                            <div className="col-start-2 col-span-4 text-4xl text-white text-center p-2 mb-3 ">
                                <p>Al rellenar este quiz, podremos recomendarle a los profesionales mas indicados para su situacion.</p>
                            </div>

                            <div className="col-start-2 col-span-4 row-span-3 cool scrul custom-scroll p-10 rounded">
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
                                    <button type="submit" className=" border-black h-10 w-24 text-center transition duration-300 ease-in-out bg-purple-600 hover:bg-purple-800 hover:border-purple-800 border-2 border-purple-600 rounded cursor-pointer mr-4">Enviar</button>
                                </div>
                            </div>
                        </div> :
                        <div className="grid grid-cols-6 grid-rows-5 gap-3 col-span-6 row-span-5">
                            <div className="col-start-2 col-span-4 text-4xl text-white text-center p-2 mb-3 ">
                                <p>Su resultado es: {resultado} </p>
                            </div>
                            <div className="col-start-2 col-span-4 row-span-3 cool scrul p-10 rounded">
                                {psica}
                            </div>
                        </div>}
                </div>
            </div>
        </form>
    )
}
export default Test