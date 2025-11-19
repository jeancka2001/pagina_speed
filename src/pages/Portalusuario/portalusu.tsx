"use client";

import "./portalusu.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Consultas = async (parm: string) => {
    let datos = {
        "cedula": "" + parm + "",
        "operador": "appspeed"
    }
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/PortalApi/GetClientsDetails", datos)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
const obtenerFacturas = async (idcliente: number) => {
    let datosf = {
        "id": idcliente
    }
    try {
        let { data } = await axios.post("http://localhost:3007/hotspot/internet", datosf)
        console.log("data: ", data)
        return data
    } catch (error) {
        return error
    }
}
const obtenerFacturasnp = async (idcliente: number) => {
    let datosf = {
        "id": idcliente,
        "estado": 1
    }
    try {
        let { data } = await axios.post("http://localhost:3007/hotspot/internet2", datosf)
        console.log("datanp: ", data)
        return data
    } catch (error) {
        return error
    }
}


const obtenerFacturasp = async (idcliente: number) => {
    let datosf = {

        "id": idcliente,
        "estado": 0
    }
    try {
        let { data } = await axios.post("http://localhost:3007/hotspot/internet2", datosf)
        console.log("datap: ", data)
        return data
    } catch (error) {
        return error
    }
}


const Iniciopagina: React.FC = () => {
    // Estados para almacenar los datos
    const [idcliente, setIdcliente] = useState<any>()
    const [cedula, setCedula] = useState("")
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [movil, setMovil] = useState("")
    const [ip, setIp] = useState("")
    const [direccion_principal, setDireccionPrincipal] = useState("")
    const [datost, setDatost] = useState<any>(null)
    const [datosservicioscli, setdatosservicioscli] = useState<any>(null)
    

    const [servicio, setservicio] = useState<any>(null)
    const [showModal, setShowModal] = useState(false)
    const [historialFacturas, setHistorialFacturas] = useState<any[]>([])
    const [historialFacturasnp, setHistorialFacturasnp] = useState<any[]>([])
    const [historialFacturasp, setHistorialFacturasp] = useState<any[]>([])
    const [cargandoFacturas, setCargandoFacturas] = useState(false)


    // useEffect(() => {

    //     Consultas("2").then(oupt => {
    //         if (oupt.estado == "exito") {
    //             let datos = oupt.datos[0]
    //             setIdcliente(oupt.datos[0].id)
    //             setCedula(datos.cedula)
    //             setNombre(datos.nombre)
    //             setCorreo(datos.correo)
    //             setMovil(datos.movil)
    //             setDireccionPrincipal(datos.direccion_principal)
    //             setIp(oupt.datos[0].servicios[0].ip)
    //             setDatost(oupt.datos[0])
    //         }
    //         console.log("h: ", oupt.datos[0].nombre)

    //         console.log("ip: ", oupt.datos[0].servicios[0].ip)

    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }, [])




    //soporte:
    const autosoporte = async () => {
        try {
            console.log(datost)
            if (datost.estado == "ACTIVO") {
                console.log("bien")
                try {
                    console.log(servicio)
                    let idservicio =servicio.id
                    console.log(idservicio)
                    
                    let {data} = await axios.get("http://localhost:3007/hotspot/estadoservicio/"+idservicio)
                    console.log("servisio estado:", data)
                    
                    let statusserv = data.onu_status
                    if(statusserv=="Online"){
                        console.log("onlmine")
                        console.log("olt_id", servicio.smartolt.olt_id
                           )
                        try{
                            let paramsserv = {
                                "onu_external_id": datost.ID_EXTERNO_ONU,
                                "ideservicio": idservicio,
                                "olt_id": servicio[0].smartolt.olt_id,
                                "nodo": servicio[0].nodo
                            }
                            console.log("parametros de servicio para ejecutar soporte", paramsserv)

                            try {
                                let { data } = await axios.post("https://api.t-ickets.com/mikroti/MovilApi/Soporte", paramsserv)
                                console.log("soporte 1", data)
                                return data
                            } catch (error) {
                                console.log("error de funcion soporte")
                                return error
                            }
                        }catch(error){
                            return error
                        }
                        

                    }else{
                        console.log("ticket dervociop")
                    }
                } catch (error) {
                    console.log("mandar ticket2")
                }

            } else {
                console.log("mandar ticket1")
            }
        } catch (error) {
            return error
        }
        // let datosf = {
        //     "id": ,
        //     "estado": 1
        // }
        // try {
        //     let { data } = await axios.post("http://localhost:3007/hotspot/internet2", datosf)
        //     console.log("datanp: ", data)
        //     return data
        // } catch (error) {
        //     return error
        // }
    }

    // MODALES...................................................................................._______________________________________________________________________________________

    const extraerdatosfactura = async (id: number) => {
        console.log("here", id)
        try {
            const resultado = await obtenerFacturas(id)
            if (resultado.estado === "exito" && resultado.facturas) {
                setHistorialFacturas(resultado.facturas)

            } else {
                setHistorialFacturas([])
            }
            const resultadonp = await obtenerFacturasnp(id)
            if (resultadonp.estado === "exito" && resultadonp.facturas) {
                setHistorialFacturasnp(resultadonp.facturas)
                console.log("totalesnp:", setHistorialFacturasnp.length)
            } else {
                setHistorialFacturasnp([])
            }
            const resultadop = await obtenerFacturasp(id)
            if (resultadop.estado === "exito" && resultadop.facturas) {
                setHistorialFacturasp(resultadop.facturas)
                console.log("totalesp:", setHistorialFacturasp.length)
            } else {
                setHistorialFacturasp([])
            }
            console.log(resultado, resultadop, resultadonp)
        } catch (error) {
            console.error("Error al cargar facturas:", error)
            setHistorialFacturas([])
        } finally {
            setCargandoFacturas(false)
        }
    }
    const abrirModalFacturas = async () => {


        try {
            // const resultado = await obtenerFacturas(idcliente)
            // if (resultado.estado === "exito" && resultado.facturas) {
            //     setHistorialFacturas(resultado.facturas)

            // } else {
            //     setHistorialFacturas([])
            // }
            const resultadonp = await obtenerFacturasnp(idcliente)
            if (resultadonp.estado === "exito" && resultadonp.facturas) {
                setHistorialFacturasnp(resultadonp.facturas)
                console.log("totalesnp:", setHistorialFacturasnp.length)
            } else {
                setHistorialFacturasnp([])
            }
            const resultadop = await obtenerFacturasp(idcliente)
            if (resultadop.estado === "exito" && resultadop.facturas) {
                setHistorialFacturasp(resultadop.facturas)
                console.log("totalesp:", setHistorialFacturasp.length)
            } else {
                setHistorialFacturasp([])
            }
        } catch (error) {
            console.error("Error al cargar facturas:", error)
            setHistorialFacturas([])
        } finally {
            setCargandoFacturas(false)
        }
    }

    //modal sesion
    const [showModalSesion, setShowModalSesion] = useState(false)
    const [cargandoSesion, setCargandoSesion] = useState(false)
    const [sesionData, setSesionData] = useState({
        usuario: "",
        contrasena: ""
    })
    const handleSesionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSesionData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const abrirmodalsesion = async () => {
        setShowModalSesion(true)
    }

    const extraerdatos = async (cedula: any) => {
        Consultas(cedula).then(oupt => {
            if (oupt.estado == "exito") {
                let datos = oupt.datos[0]
                setIdcliente(oupt.datos[0].id)
                setCedula(datos.cedula)
                setNombre(datos.nombre)
                setCorreo(datos.correo)
                setMovil(datos.movil)
                setDireccionPrincipal(datos.direccion_principal)
                setIp(oupt.datos[0].servicios[0].ip)
                setDatost(oupt.datos[0])
                setservicio(oupt.datos[0].servicios[0])
            }
            console.log("h: ", oupt.datos[0].nombre)

            console.log("ip: ", oupt.datos[0].servicios[0].ip)

        }).catch(err => {
            console.log(err)
        })
        // abrirModalFacturas()
        extraerdatosfactura(idcliente)
        setShowModalSesion(false)
    }
    const iniciarSesion = async () => {
        if (!sesionData.usuario.trim() || !sesionData.contrasena.trim()) {
            alert("Por favor complete usuario y contraseña")
            return
        }

        setCargandoSesion(true)

        try {
            const datosLogin = {
                cedula: sesionData.usuario,
                passwors: sesionData.contrasena // Nota: el API espera "passwors" (posible typo en el API)
            }

            console.log("Enviando datos de login:", datosLogin)

            const response = await axios.post("https://api.t-ickets.com/mikroti/Login", datosLogin, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log("Respuesta del login:", response.data)

            if (response.data.estado === "exito") {

                console.log("cedula inica seison: ", cedula)

                setShowModalSesion(false)
                // Limpiar formulario
                setSesionData({ usuario: "", contrasena: "" })
                // Aquí puedes guardar el token o datos del usuario si es necesario
            } else {
                console.log("credenciales incorrectas")
            }
            extraerdatos(datosLogin.cedula)
        } catch (error) {
            console.error("Error al iniciar sesión:", error)

        } finally {
            setCargandoSesion(false)
        }
    }



    //factura



    // Función para formatear el estado de la factura
    const formatearEstado = (estado: string) => {
        switch (estado.toLowerCase()) {
            case 'pagado':
                return 'pagado'
            case 'no pagado':
                return 'pendiente'
            case 'vencido':
                return 'vencida'
            default:
                return estado
        }
    }

    // // Función para obtener la clase CSS según el estado
    const getClaseEstado = (estado: string) => {
        switch (estado.toLowerCase()) {
            case 'pagado':
                return 'pagado'
            case 'no pagado':
                return 'pendiente'
            case 'vencido':
                return 'vencida'
            default:
                return 'pendiente'
        }
    }
    function testinter() {
        window.open("https://speedecuador.speedtestcustom.com/")
    }

    function irwhats() {
        window.open("https://api.whatsapp.com/send?phone=593997500911")
    }


    // modal tickets

    //mstrar tickets
    // Estados para el modal de ticket
    const [showModalTicket, setShowModalTicket] = useState(false)
    const [cargandoTicket, setCargandoTicket] = useState(false)
    const [formTicket, setFormTicket] = useState({
        asunto: "",
        contenido: "",
        fechavisita: "",
        turno: "MAÑANA",
        archivo: null as File | null
    })

    // Función para abrir el modal de ticket
    const abrirModalTicket = () => {
        setShowModalTicket(true)
        // Resetear formulario
        setFormTicket({
            asunto: "",
            contenido: "",
            fechavisita: "",
            turno: "MAÑANA",
            archivo: null
        })
    }
    const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormTicket(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Función para manejar archivo
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormTicket(prev => ({
                ...prev,
                archivo: e.target.files![0]
            }))
        }
    }
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                // Remover el prefijo data:image/jpeg;base64,
                const base64 = (reader.result as string).split(',')[1]
                resolve(base64)
            }
            reader.onerror = error => reject(error)
        })
    }
    const crearNuevoTicket = async () => {
        if (!formTicket.asunto.trim() || !formTicket.contenido.trim()) {
            alert("Por favor complete el asunto y el contenido del ticket")
            return
        }

        setCargandoTicket(true)

        try {
            const formData = new FormData()

            // Agregar datos del ticket
            const ticketData = {
                id: idcliente,
                asunto: formTicket.asunto,
                solicitante: nombre,
                fechavisita: formTicket.fechavisita || new Date().toISOString().split('T')[0],
                turno: formTicket.turno,
                agendado: "PAGINA WEB",
                contenido: formTicket.contenido
            } as any
            console.log("ticketdata", ticketData)
            // Agregar archivo si existe
            if (formTicket.archivo) {
                const base64File = await fileToBase64(formTicket.archivo)
                ticketData.adjunto = {
                    nombre: formTicket.archivo.name,
                    file: base64File
                }
            }
            console.log("Enviando JSON:", JSON.stringify(ticketData, null, 2))

            console.log("Enviando JSON2:", ticketData)
            // formData.append('data', JSON.stringify(ticketData))
            console.log("formdata: ", formData)
            // const respuesta = await axios.post("http://localhost:3007/hotspot/crearticket", formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            const datoscretickets = JSON.stringify(ticketData, null, 2)
            console.log("datossss", datoscretickets)
            const { data } = await axios.post(
                "http://localhost:3007/hotspot/crearticket",
                ticketData,  // Enviar el objeto directamente, no stringificado
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log("respuesta 1: ", data)
            console.log("Respuesta del ticket:", data)

            // if (respuesta.data.estado === "exito") {
            //     alert(`Ticket creado exitosamente. ID: ${respuesta.data.idticket}`)
            //     setShowModalTicket(false)
            // } else {
            //     alert("Error al crear el ticket: " + (respuesta.data.mensaje || "Error desconocido"))
            // }
            if (data.estado === "exito") {
                alert(`Ticket creado exitosamente. ID: ${data.idticket}`)
                setShowModalTicket(false)
                setFormTicket({
                    asunto: "",
                    contenido: "",
                    fechavisita: "",
                    turno: "MAÑANA",
                    archivo: null
                })
            } else {
                alert("Error al crear el ticket: " + (data.mensaje || "Error desconocido"))
            }
            return data
        } catch (error) {
            console.error("Error al crear ticket:", error)

        } finally {
            setCargandoTicket(false)
        }
    }


    return (
        <div className="portal-container" style={{ height: '100vh', overflowY: 'auto' }}>
            <Navbar />

            <main className="portal-main">
                {/* Header Section */}
                <div className="portal-card portal-header-section">
                    <div>
                        <h1 className="portal-title">Portal de cliente</h1>
                        <h2 style={{ color: '#0901ffac', margin: '10px 0' }}>
                            Cliente: {nombre || ''}
                        </h2>
                        <p className="portal-subtitle">DIRECCIÓN: {direccion_principal}</p>
                    </div>
                    <div className="portal-flex portal-gap-2">
                        <button className="portal-btn portal-btn-primary" onClick={abrirmodalsesion} >Inicia Sesion</button>
                        <button className="portal-btn portal-btn-ghost">Cerrar Sesion</button>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="portal-grid">
                    {/* Resumen Card */}
                    <div className="portal-card portal-p-5">
                        <div className="portal-section-title">Resumen</div>
                        <div className="portal-text-sm portal-space-y-2 portal-mt-2">
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-text-gray">Plan actual</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {datost?.servicios?.[0]?.perfil || 'No disponible'}
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-text-gray">Saldo</span>
                                <span className="portal-font-medium portal-text-dark">
                                    ${datost?.facturacion?.total_facturas || '0.00'}
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-text-gray">Estado</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {datost?.estado || 'No dosiponible'}
                                </span>
                            </div>
                            <div className="portal-flex portal-gap-2 portal-mt-4">
                                <button className="portal-btn portal-btn-primary portal-w-full">Pagar ahora</button>
                                <button className="portal-btn portal-btn-ghost portal-w-full">Subir de plan</button>
                            </div>
                        </div>
                    </div>

                    {/* Facturas Card */}
                    <div className="portal-card portal-p-5">
                        <div className="portal-section-title">Facturas</div>
                        <div className="portal-text-sm portal-space-y-3 portal-mt-2">
                            {/* <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-text-dark">Facturas Totales</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {historialFacturas.length || 0}
                                </span>
                            </div> */}
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-text-dark">Facturas pagadas</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {historialFacturasp.length || 0}
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-text-dark">Facturas pendientes</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {historialFacturasnp.length || 0}
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-text-dark">Total a pagar</span>
                                <span className="portal-font-medium portal-text-dark">
                                    ${datost?.facturacion?.total_facturas || '0.00'}
                                </span>
                            </div>
                            <button
                                className="portal-btn portal-btn-ghost portal-w-full portal-mt-2"
                                onClick={abrirModalFacturas}
                            >
                                Ver historial
                            </button>
                        </div>
                    </div>

                    {/* Soporte Card */}
                    <div className="portal-card portal-p-5">
                        <div className="portal-section-title">Soporte</div>
                        <div className="portal-card portal-p-5 portal-mt-2">
                            Estado del servicio: {datost?.estado || 'ACTIVO'}
                            <div className="portal-text-sm portal-text-gray portal-mt-2">
                                {datost?.estado === 'ACTIVO' ? 'Servicio funcionando correctamente' : 'Servicio suspendido'}
                            </div>
                        </div>
                        <div className="portal-flex portal-gap-2 portal-mt-4">
                            <button className="portal-btn portal-btn-primary portal-w-full" onClick={() => autosoporte()}>Auto Soprte</button>
                            <button className="portal-btn portal-btn-ghost portal-w-full" onClick={() => irwhats()}>Ir al whatsapp</button>
                        </div>
                    </div>

                    {/* Red y Dispositivos */}
                    <div className="portal-card portal-p-5">
                        <div className="portal-section-title">Red y Dispositivos</div>
                        <div className="portal-text-sm portal-space-y-2">
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-font-medium portal-text-dark">Equipo</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {datost?.MODELO_DE_EQUIPO || 'No disponible'}
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-font-medium portal-text-dark">Modelo del Equipo</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {datost?.MODELO_DE_EQUIPO || 'No disponible'}
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-font-medium portal-text-dark">Tipo de servicio</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {datost?.Tipo_de_Servicio || 'No disponible'}
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-font-medium portal-text-dark">IP</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {ip || 'No disponible'}
                                </span>
                            </div>

                            <button className="portal-btn portal-btn-primary portal-w-full">Gestionar Wifi</button>
                        </div>
                    </div>

                    {/* Herramientas Card */}
                    <div className="portal-card portal-p-5">
                        <div className="portal-section-title">Herramientas</div>
                        <div className="portal-text-sm portal-flex portal-flex-col portal-gap-2 portal-mt-2">
                            <button className="portal-btn portal-btn-primary portal-w-full" onClick={() => testinter()}>Test de velocidad</button>
                            <button className="portal-btn portal-btn-ghost portal-w-full">Status de red</button>
                            <button className="portal-btn portal-btn-ghost portal-w-full">Reportar pago</button>
                        </div>
                    </div>
                </div>


                {/* modal de sesion */}
                {showModalSesion && (
                    <div className="modal-overlay" onClick={() => setShowModalSesion(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            {/* Header del Modal */}
                            <div className="modal-header">
                                <h3 className="modal-title">Inicie sesión</h3>
                                <button
                                    className="modal-close-btn"
                                    onClick={() => setShowModalSesion(false)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="ticket-form">
                                    <div className="form-group">
                                        <label htmlFor="usuario" className="form-label">Usuario</label>
                                        <input
                                            type="text"
                                            id="usuario"
                                            name="usuario"
                                            value={sesionData.usuario}
                                            onChange={handleSesionChange}
                                            className="form-input"
                                            placeholder="Ingrese el Usuario"
                                        />
                                    </div>
                                    <hr className="form-separator" />
                                    <div className="form-group">
                                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                                        <input
                                            type="password" // Cambiado de "text" a "password"
                                            id="contrasena"
                                            name="contrasena"
                                            value={sesionData.contrasena}
                                            onChange={handleSesionChange}
                                            className="form-input"
                                            placeholder="Ingrese su contraseña"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer del Modal */}
                            <div className="modal-footer">
                                <button
                                    className="portal-btn portal-btn-secondary"
                                    onClick={() => setShowModalSesion(false)}
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="portal-btn portal-btn-primary"
                                    onClick={iniciarSesion}
                                    disabled={cargandoSesion}
                                >
                                    {cargandoSesion ? "Iniciando sesión..." : "Iniciar Sesión"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal de Historial de Facturas ___________________________________________________________________________________________________________________________________*/}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            {/* Header del Modal */}
                            <div className="modal-header">
                                <h3 className="modal-title">Historial de Facturas</h3>
                                <button
                                    className="modal-close-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    ×
                                </button>
                            </div>

                            {/* Contenido del Modal con Scroll */}
                            <div className="modal-body">
                                {cargandoFacturas ? (
                                    <div className="cargando-facturas">
                                        <p>Cargando facturas...</p>
                                    </div>
                                ) : historialFacturas.length === 0 ? (
                                    <div className="sin-facturas">
                                        <p>No se encontraron facturas</p>
                                    </div>
                                ) : (
                                    <div className="facturas-grid">
                                        {historialFacturas.map((factura) => (
                                            <div key={factura.id} className="factura-card">
                                                <div className="factura-header">
                                                    <span className="factura-id">Factura #{factura.id}</span>
                                                    <span className={`factura-estado ${getClaseEstado(factura.estado)}`}>
                                                        {formatearEstado(factura.estado)}
                                                    </span>
                                                </div>
                                                <div className="factura-details">
                                                    <div className="factura-row">
                                                        <span>Fecha de emisión:</span>
                                                        <span>{factura.emitido}</span>
                                                    </div>
                                                    <div className="factura-row">
                                                        <span>Vencimiento:</span>
                                                        <span>{factura.vencimiento}</span>
                                                    </div>
                                                    <div className="factura-row">
                                                        <span>Subtotal:</span>
                                                        <span>{factura.subtotal2}</span>
                                                    </div>
                                                    <div className="factura-row">
                                                        <span>Impuesto:</span>
                                                        <span>{factura.impuesto2}</span>
                                                    </div>
                                                    <div className="factura-row">
                                                        <span>Total:</span>
                                                        <span className="factura-monto">{factura.total2}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer del Modal */}
                            <div className="modal-footer">
                                <button
                                    className="portal-btn portal-btn-primary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* modal sticket */}
                {showModalTicket && (
                    <div className="modal-overlay" onClick={() => setShowModalTicket(false)}>
                        <div className="modal-content modal-ticket" onClick={(e) => e.stopPropagation()}>
                            {/* Header del Modal */}
                            <div className="modal-header">
                                <h3 className="modal-title">Nuevo Ticket</h3>
                                <button
                                    className="modal-close-btn"
                                    onClick={() => setShowModalTicket(false)}
                                >
                                    ×
                                </button>
                            </div>

                            {/* Contenido del Modal */}
                            <div className="modal-body">
                                <div className="ticket-form">
                                    {/* Asunto del ticket */}
                                    <div className="form-group">
                                        <label htmlFor="asunto" className="form-label">Asunto del ticket</label>
                                        <input
                                            type="text"
                                            id="asunto"
                                            name="asunto"
                                            value={formTicket.asunto}
                                            onChange={handleTicketChange}
                                            className="form-input"
                                            placeholder="Ingrese el asunto del ticket"
                                        />
                                    </div>

                                    <hr className="form-separator" />

                                    {/* Archivo adjunto */}
                                    <div className="form-group">
                                        <label className="form-label">Archivo Adjunto</label>
                                        <div className="file-input-container">
                                            <input
                                                type="file"
                                                id="archivo"
                                                onChange={handleFileChange}
                                                className="file-input"
                                                accept="image/*,.pdf,.doc,.docx"
                                            />
                                            <label htmlFor="archivo" className="file-input-label">
                                                {formTicket.archivo ? formTicket.archivo.name : "Seleccionar archivo"}
                                            </label>
                                        </div>
                                        {!formTicket.archivo && (
                                            <div className="file-placeholder">Ningún archivo seleccionado</div>
                                        )}
                                    </div>

                                    <hr className="form-separator" />

                                    {/* Campos adicionales */}
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="fechavisita" className="form-label">Fecha de visita</label>
                                            <input
                                                type="date"
                                                id="fechavisita"
                                                name="fechavisita"
                                                value={formTicket.fechavisita}
                                                onChange={handleTicketChange}
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="turno" className="form-label">Turno</label>
                                            <select
                                                id="turno"
                                                name="turno"
                                                value={formTicket.turno}
                                                onChange={handleTicketChange}
                                                className="form-input"
                                            >
                                                <option value="MAÑANA">MAÑANA</option>
                                                <option value="TARDE">TARDE</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Contenido del ticket */}
                                    <div className="form-group">
                                        <label htmlFor="contenido" className="form-label">Descripción</label>
                                        <textarea
                                            id="contenido"
                                            name="contenido"
                                            value={formTicket.contenido}
                                            onChange={handleTicketChange}
                                            className="form-textarea"
                                            placeholder="Describa el problema o solicitud..."
                                            rows={6}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer del Modal */}
                            <div className="modal-footer">
                                <button
                                    className="portal-btn portal-btn-ghost"
                                    onClick={() => setShowModalTicket(false)}
                                    disabled={cargandoTicket}
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="portal-btn portal-btn-primary"
                                    onClick={crearNuevoTicket}
                                    disabled={cargandoTicket}
                                >
                                    {cargandoTicket ? "Enviando..." : "Enviar ticket"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}



export default Iniciopagina;