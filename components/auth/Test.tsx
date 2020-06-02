import React from 'react'

const Test = () => {
    return(
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
                        <p className="pb-2">Considera usted que necesita atencion profesional?</p>
                        <select className="cool w-full text-center mt-1">
                            <option selected value="Si">Si</option>
                            <option value="No">No</option>
                            <option value="Tal vez">Tal vez</option>
                        </select>
                    </div>
                    <div className="p-2"> 
                        <p className="pb-2">Su ritmo de sueño es:</p>
                        <select className="cool w-full text-center mt-1">
                            <option selected value="Bastante regular">Bastante regular</option>
                            <option value="Regular">Regular</option>
                            <option value="Irregular">Irregular</option>
                            <option value="Muy irregular">Muy irregular</option>
                        </select>
                    </div>
                    <div className="p-2"> 
                        <p className="pb-2">Suele tener problemas al relacionarse?</p>
                        <select className="cool w-full text-center mt-1">
                            <option selected value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="p-2"> 
                        <p className="pb-2">Usted se considera:</p>
                        <select className="cool w-full text-center mt-1">
                            <option selected value="Bastante facil de enojar.">Bastante facil de enojar.</option>
                            <option value="Moderadamente enojable.">Moderadamente enojable.</option>
                            <option value="Enojable en ocasiones">Enojable en ocasiones</option>
                            <option value="Calmado.">Calmado.</option>
                        </select>
                    </div>
                    <div className="p-2"> 
                        <p className="pb-2">Su familia y/o amistades le ha sugerido que reciba ayuda profesional?</p>
                        <select className="cool w-full text-center mt-1">
                            <option selected value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="p-2"> 
                        <p className="pb-2">Se considera usted una persona violenta?</p>
                        <select className="cool w-full text-center mt-1">
                            <option selected value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="p-2"> 
                        <p className="pb-2">Tiene problemas con falta del apetito?</p>
                        <select className="cool w-full text-center mt-1">
                            <option selected value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="p-2"> 
                        <p className="pb-2">Tiene problemas de motivacion?</p>
                        <select className="cool w-full text-center mt-1">
                            <option selected value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="p-2"> 
                        <p className="pb-2">Usted se considera:</p>
                        <select className="cool w-full text-center mt-1">
                            <option selected value="Bastante sociable">Bastante sociable</option>
                            <option value="Moderadamente sociable">Moderadamente sociable</option>
                            <option selected value="Poco sociable">Poco sociable</option>
                            <option selected value="Raramente sociable">Raramente sociable</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-3 col-start-3 col-span-2">
                <div className=" col-start-4">
                    <span className=" border-black h-10 w-24 text-center 
                     transition duration-300 ease-in-out bg-purple-600 hover:bg-purple-800 hover:border-purple-800 border-2 border-purple-600 rounded cursor-pointer mr-4">Enviar</span>
                </div>      
            </div>
        </div>
    )
}
export default Test