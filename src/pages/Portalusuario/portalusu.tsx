"use client";

import "./portalusu.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useIonLoading } from "@ionic/react";



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
    const [ticktes, setTicktes] = useState([])

    const [servicio, setservicio] = useState<any>(null)
    const [showModal, setShowModal] = useState(false)
    const [historialFacturas, setHistorialFacturas] = useState<any[]>([])
    const [historialFacturasnp, setHistorialFacturasnp] = useState<any[]>([])
    const [historialFacturasp, setHistorialFacturasp] = useState<any[]>([])
    const [cargandoFacturas, setCargandoFacturas] = useState(false)
    const [present, dismiss] = useIonLoading()

    // Cargar sesión desde localStorage al montar
    useEffect(() => {
        try {
            const stored = localStorage.getItem('portal_user')
            if (stored) {
                const u = JSON.parse(stored)
                setDatost(u.datost || null)
                setIdcliente(u.idcliente)
                setCedula(u.cedula || "")
                setNombre(u.nombre || "")
                setCorreo(u.correo || "")
                setMovil(u.movil || "")
                setDireccionPrincipal(u.direccion_principal || "")
                setIp(u.ip || "")
                setservicio(u.servicio || null)
            }
        } catch (err) {
            console.error('Error leyendo sesión desde localStorage', err)
        }
    }, [])
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


    const funcionpowefail = async () => {

    }
    const funcionlost = async () => {

    }
    const funcionoffline = async () => {

    }
    const funcionverygood = async (senalonu: any) => {
        console.log("bery god")
        console.log("mensaje de que esta todo bien y modal de reinciar router")
        console.log("⌛ Verificando el estado de tu Equipo Receptor")
        console.log("señal: ", senalonu.onu_signal)

        console.log("potencia: ", senalonu.onu_signal_value)
        if (senalonu.onu_signal == "Very good") {

            let idexterno = { "idexterno": datost.ID_EXTERNO_ONU }
            console.log("id usuario a envir vet tickets: ", idexterno)


            let { data } = await axios.post("http://localhost:3007/hotspot/reiniciainter/", idexterno)
            console.log("reporte de reinicio:", data)
            let reiniciodeinter = data
            console.log("datos de reinicio: ", reiniciodeinter)

        } else {

        }



    }
    const funcionwarning = async () => {

    }
    const funcioncritical = async () => {

    }
    const funciononline = async () => {


        let idservicio = servicio.id
        // Extraer olt_id directamente del string
        const oltIdMatch = servicio.smartolt.match(/olt_id";s:\d+:"([^"]*)"/);
        const olt_id = oltIdMatch ? oltIdMatch[1] : "no_encontrado";

        console.log("olt_id", olt_id);

        let paramsserv = {
            "onu_external_id": datost.ID_EXTERNO_ONU,
            "ideservicio": idservicio,
            "olt_id": olt_id,
            "nodo": servicio.nodo
        }
        console.log("parametros para soporte", paramsserv)

        try {
            console.log("dentro")
            let idserviciootl = servicio.id
            console.log(idservicio)
            //estado y veloidad del internet
            let { data } = await axios.get("http://localhost:3007/hotspot/estadoonu/" + idserviciootl)
            console.log("onu señal:", data)
            let senalonu = data
            console.log(senalonu)
            if (data.onu_signal == "Very good") {
                console.log("coneccion exelente")
                funcionverygood(senalonu)


            } else {
                if (data.onu_signal == "Warning") {
                    console.log("warnig= coneccion buena")
                    funcionwarning()
                } else {
                    if (data.onu_signal == "Critical") {
                        console.log("critical")
                        console.log("crear tickey")
                        // crearNuevoTicket()



                    } else {

                        console.log("onu_signal -")
                    }
                }
            }

        } catch (error) {
            return error
        }
        // let { data: soporteData } = await axios.post("https://api.t-ickets.com/mikroti/MovilApi/Soporte", paramsserv)
        // console.log("soporte 1", soporteData)
        // return soporteData
    }


    //soporte:
    function obtenervaariables(dato: any) {
        if (dato == "" || !dato) {
            return undefined;
        }

        console.log("here");
        const variables: { [key: string]: string } = {};

        try {
            // Si ya es un string, usarlo directamente
            const dataString = typeof dato === 'string' ? dato : JSON.stringify(dato);

            // Extraer el contenido entre llaves
            const match = dataString.match(/a:\d+:\{(.+)\}/);
            if (!match) {
                console.log("Formato no válido");
                return undefined;
            }

            const contenido = match[1];

            // Procesar cada par clave-valor
            const elementos = contenido.split(';').filter(item => item.trim() !== '');

            for (let i = 0; i < elementos.length; i += 2) {
                if (i + 1 < elementos.length) {
                    const clave = elementos[i].replace(/^s:\d+:"|"$/g, '');
                    const valor = elementos[i + 1].replace(/^s:\d+:"|"$/g, '');
                    variables[clave] = valor;
                }
            }

            console.log(variables);
            return variables;

        } catch (error) {
            console.error("Error procesando datos:", error);
            return undefined;
        }
    }
    const Equipos = async (parms: any) => {
        try {
            let { data } = await axios.get("https://api.t-ickets.com/mikroti/PortalApi/Listequipo/" + parms)
            console.log(data)
            return data
        } catch (error) {
            return error
        }
    }
    const DetalleOlt = async (parms: any) => {
        console.log("m")
        try {
            let { data } = await axios.get("https://api.t-ickets.com/mikroti/api/SmartApi/get_onu_details/" + parms)
            return data
        } catch (error) {
            return error
        }
    }
    const Detalleoltport = async (parms: any) => {
        console.log("o")
        try {
            let { data } = await axios.get("https://api.t-ickets.com/mikroti/api/SmartApi/get_olt_pon_ports_details/" + parms)
            return data
        } catch (error) {
            return error
        }
    }
    const Gt_onu_status = async (parms: any) => {
        console.log("i")
        try {
            let { data } = await axios.get("https://api.t-ickets.com/mikroti/api/SmartApi/get_onu_status/" + parms)
            return data
        } catch (error) {
            return error
        }
    }
    const Get_onu_signal = async (parms: any) => {
        console.log("u")
        console.log(parms)
        try {
            let { data } = await axios.get("https://api.t-ickets.com/mikroti/api/SmartApi/get_onu_signal/" + parms)
            console.log(data)
            return data
        } catch (error) {
            return error
        }
    }
    const infoequipo = async () => {
        console.log("debe de ser el idexs",datost.ID_EXTERNO_ONU)
        let idexonu= {"id": datost.ID_EXTERNO_ONU}
        console.log("id externo onu: ",idexonu)
        const url = 'http://localhost:3007/hotspot/device?query={"_id":"'+datost.ID_EXTERNO_ONU+'"}'
    console.log(url)
        try {
             let { data } = await axios.get(url)
            console.log("daot de rouer: ",data)
            // return data
            equipo(data)
        } catch (error) {
            return error
        }
    }

    function equipo(data: any) {
    try {
        // 1. Ya viene parseado, usar directamente
        let lista = data;
        
        // 2. Validar que existe data
        if (!lista || lista.length === 0) {
            return "Lista no encontrada"
        }

        // 3. Tomar el primer elemento del array (si es un array)
        let dispositivoData = Array.isArray(lista) ? lista[0] : lista;
        
        // 4. Validar que existe InternetGatewayDevice y LANDevice
        if (!dispositivoData?.InternetGatewayDevice?.LANDevice?.["1"]?.Hosts?.Host) {
            console.log("Estructura no esperada:", dispositivoData);
            return "No se pudo obtener la información de dispositivos conectados";
        }
        
        // 5. Navegar hasta los hosts (dispositivos conectados)
        let test = dispositivoData.InternetGatewayDevice.LANDevice["1"].Hosts.Host;
        
        // 6. Si no hay hosts, retornar mensaje
        if (!test || Object.keys(test).length === 0) {
            return "No hay dispositivos conectados"
        }
        
        // 7. Convertir objeto a array
        const arrayDeObjetos = Object.keys(test)
            .filter((key) => !isNaN(Number(key))) // Solo keys numéricas
            .map((clave) => ({
                host: clave,
                ...test[clave]
            }));
        
        let equipos = ""
        
        // 8. Recorrer cada dispositivo y formatear
        for (let dispositivo of arrayDeObjetos) {
            if (dispositivo["HostName"] && dispositivo["HostName"]["_value"] != "") {
                equipos = equipos + "\n📱 Nombre: " + dispositivo["HostName"]["_value"]
            } else {
                equipos = equipos + "\n📱 Nombre: Desconocido"
            }
        }
        
        // 9. Retornar resultado
        console.log("Dispositivos encontrados:", equipos)
        return "Lista de Dispositivos conectados:" + equipos
        
    } catch (error) {
        console.log("error: ",error)
        return "Error al procesar los datos: " + error
    }
}
    const Soporte = async (so: any) => {
        infoequipo()
        console.log("su: ", so)
        let infouser = obtenervaariables(datost.servicios[0].smartolt)

        let samrtolt = obtenervaariables(datost.servicios[0].smartolt)
        console.log("infouser", infouser)
        console.log("smairotl: ", samrtolt)

        console.log("h")

        console.log(datost.servicios[0].nodo)
        Equipos(datost.servicios[0].nodo).then(ou => {
            if (ou.estado == "exito") {
                console.log("r")
                dismiss()
                if (ou.routers.length > 0) {
                    console.log("q")
                    console.log(ou.routers[0].estado)
                    console.log(infouser)
                    dismiss()
                    present({
                        message: 'Comprobando Olt',
                        cssClass: 'custom-loading',
                        spinner: "bubbles",
                        //duration: 1500,
                    })
                    DetalleOlt(datost.servicios[0].id).then(ouput => {
                        console.log("dentro de DetalleOlt")
                        console.log(ouput)
                        if (ouput.status) {
                            dismiss()
                            present({
                                message: 'Comprobando puertos olt',
                                cssClass: 'custom-loading',
                                spinner: "bubbles",
                                duration: 2500
                            })
                            let idolt = ouput.onu_details.olt_id
                            console.log(idolt)
                            Detalleoltport(idolt).then(ou => {
                                dismiss()
                                let board = ouput.onu_details["board"]
                                let poart = ouput.onu_details["port"]
                                console.log(ouput.onu_details, ou)
                                if (ou && ou.response && Array.isArray(ou.response)) {
                                    let oltstatus = ou.response.find((element: any) =>
                                        element && element.board == board && element.pon_port == poart
                                    );

                                    if (oltstatus && !oltstatus.operational_status.includes("Up")) {
                                        // Tu código aquí cuando no está "Up"
                                        console.log("Puerto OLT no está operativo:", oltstatus.operational_status);
                                        window.alert({
                                            message: 'crear pantalla con mensaje daño masivo y no se genera tickte',
                                            cssClass: 'custom-loading',
                                            duration: 4500,
                                            buttons: [
                                                {
                                                    text: "cerrar",
                                                    role: "cancel",

                                                }
                                            ]
                                        })
                                    } else {
                                        dismiss()
                                        present({
                                            message: 'Comprobando estado onu ',
                                            cssClass: 'custom-loading',
                                            spinner: "bubbles",
                                            // duration: 1500
                                        })
                                        console.log("id ciente", datost.servicios[0].id)
                                        Gt_onu_status(datost.servicios[0].id).then(ouputv => {
                                            console.log(ouputv)
                                            if (ouputv.status) {
                                                if (ouputv.onu_status == "Los") {
                                                    /* crear tickte */
                                                    dismiss()
                                                    present({
                                                        message: 'crear pantalla con mensaje de Los',
                                                        cssClass: 'custom-loading',
                                                        duration: 4500
                                                    })
                                                    return
                                                }
                                                if (ouputv.onu_status == "Power fail") {
                                                    dismiss()
                                                    present({
                                                        message: 'crear gif intructivo. seria un modal con el gif',
                                                        cssClass: 'custom-loading',
                                                        duration: 4500
                                                    })
                                                    /* Revisar conexio gif intructivo */
                                                    return
                                                }
                                                if (ouputv.onu_status == "Online") {
                                                    dismiss()
                                                    present({
                                                        message: 'Comprobando estado de la señal',
                                                        cssClass: 'custom-loading',
                                                        spinner: "bubbles",
                                                        duration: 3500
                                                    })
                                                    console.log(datost.servicios[0].id)
                                                    Get_onu_signal(datost.servicios[0].id).then(ouput => {
                                                        console.log("paso")
                                                        if (ouput.status) {
                                                            dismiss()
                                                            console.log(ouput)
                                                            let se = ouput.onu_signal_1490.replace("-", "").replace("dBm", "")
                                                            console.log(se)
                                                            if (se < 29) {
                                                                
                                                                present({
                                                                    message: 'Buena señal',
                                                                    cssClass: 'custom-loading',
                                                                    duration: 4500,
                                                                })
                                                            }
                                                            /*if (se > 26.50 && se < 29) {
                                                                /** tickte de revision *
                                                                
    
                                                            }*/
                                                            if (se > 29) {
                                                                /**visita tecnica */
                                                                console.log(datost.nombre, idcliente)
                                                                let info = {
                                                                    "idcliente": idcliente,
                                                                    "asunto": "TIKET DE SOPORTE AGENDADO POR SPEEDMAN",
                                                                    "solicitante": "CHALAN CALDERON VICTOR HUGO",
                                                                    "fechavisita": ("fecha"),
                                                                    "turno": ("boton ´para que se puedaseleccionar si quiere turno en la tarde o en la mñn"),
                                                                    "contenido": "Hola,<br> Necesito ayuda para mi conexión de internet " + ouput.onu_signal_1490 + "."
                                                                }
                                                                if (so == 0) {
                                                                    present({
                                                                        message: 'Creando ticket de soporte',
                                                                        cssClass: 'custom-loading',
                                                                        duration: 4500,
                                                                    })

                                                                    crearNuevoTicket(info)

                                                                    return
                                                                } else {

                                                                    present({
                                                                        message: 'Tienes un ticke abierto ',
                                                                        cssClass: 'custom-loading',
                                                                        duration: 4500,
                                                                    })
                                                                }
                                                            }
                                                        } else {
                                                            /* present({
                                                                 message: 'Hubo un error intente mas tarde',
                                                                 cssClass: 'custom-loading',
                                                                 duration: 4500,
                                                                 buttons: [
                                                                     {
                                                                         text: "cerrar",
                                                                         role: "cancel",
     
                                                                     }
                                                                 ]
                                                             })*/
                                                        }
                                                    })
                                                    return
                                                }

                                            }
                                        })
                                    }
                                }
                                console.log(status)
                            }).catch(error => {
                                console.log(error)
                            })

                        }

                    })
                }
            }
            else {
                dismiss()
                present({
                    message: ou.mensaje,
                    cssClass: 'custom-loading',
                    spinner: "bubbles",
                    duration: 4500,
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const autosoporte2 = async () => {
        try {
            let idusuario = { "idcliente": datost.id };
            console.log(idusuario);

            let { data } = await axios.post("http://localhost:3007/hotspot/listartickets/", idusuario);
            console.log("lista tickets:", data);

            // Verificar si data.data existe antes de acceder a tickets
            if (data.data && data.data.tickets) {
                console.log(data.data.tickets);

                if (data.estado == "exito") {
                    setTicktes(data.data.tickets);

                    // Corregir el filter - verificar que e no sea undefined
                    let soport = data.data.tickets.filter((e: any) => e && e.estado == "abierto").length;

                    // Llamar a Soporte como async
                    await Soporte(soport);

                } else {
                    console.log("Estado no exitoso:", data.estado);
                    Soporte(0)
                }
            } else {
                console.log("No hay datos de tickets en la respuesta");
            }

        } catch (error) {
            console.error("Error en autosoporte2:", error);
        }
    }
    const autosoporte = async () => {
        try {



            let idusuario = { "idcliente": datost.id }
            console.log("id usuario a envir vet tickets: ", idusuario)

            let { data } = await axios.post("http://localhost:3007/hotspot/listartickets/", idusuario)
            console.log("lista tickets:", data)
            if (data.estado == "exito") {
                setTicktes(data.data.tickets)
                console.log(ticktes)

            } else {

            }
            let listatickets = data
            console.log(listatickets.data.abiertos)
            let ticketabierto = listatickets.data.abiertos

            if (ticketabierto == 1) {
                console.log("Al momento usted cuenta con un ticket de soporte")
                console.log("Por favor esperar la llamada del Coordinador de Rutas.")

            } else {
                console.log("no hay tickets abiertos toca abrir uno")

            }


            console.log(datost)
            if (datost.estado == "ACTIVO") {
                console.log("bien")
                try {
                    console.log(servicio)
                    let idservicio = servicio.id
                    console.log(idservicio)

                    let { data } = await axios.get("http://localhost:3007/hotspot/estadoservicio/" + idservicio)
                    console.log("servicio estado:", data)

                    let statusserv = data
                    if (statusserv.onu_status == "Online") {
                        console.log("online")
                        funciononline()

                    } else {

                        console.log("onu estatus servicio")
                        if (statusserv == "Power fail") {
                            console.log("Por Favor Verifique que su equipo wifi este conectado a la corriente.")
                            funcionpowefail()

                        } else {
                            if (statusserv == "LOS") {
                                console.log("los listar tickets: ")
                                funcionlost()

                                return data
                            } else {
                                if (statusserv == "offline") {
                                    console.log("Por Favor Verifique que su equipo wifi este conectado a la corriente.")

                                }
                            }
                        }
                    }
                } catch (error) {
                    console.log("mandar ticket2", error)
                }
            } else {
                console.log("mandar ticket1")
            }
        } catch (error) {
            return error
        }
    }
    // MODALES...................................................................................._______________________________________________________________________________________

    const extraerdatosfactura = async (id: number, mostrarCarga: boolean = true) => {
        console.log("here", id)
        try {
            // Solo mostrar indicador de carga si se abre el modal (no al iniciar sesión)
            if (mostrarCarga) {
                present({
                    message: 'Cargando facturas...',
                    cssClass: 'custom-loading',
                    spinner: "bubbles",
                })
            }

            // Hacer las 3 llamadas en paralelo en lugar de secuencial
            const [resultado, resultadonp, resultadop] = await Promise.all([
                obtenerFacturas(id),
                obtenerFacturasnp(id),
                obtenerFacturasp(id)
            ])

            // Procesar resultados
            if (resultado.estado === "exito" && resultado.facturas) {
                setHistorialFacturas(resultado.facturas)
            } else {
                setHistorialFacturas([])
            }

            if (resultadonp.estado === "exito" && resultadonp.facturas) {
                setHistorialFacturasnp(resultadonp.facturas)
                console.log("totalesnp:", resultadonp.facturas.length)
            } else {
                setHistorialFacturasnp([])
            }

            if (resultadop.estado === "exito" && resultadop.facturas) {
                setHistorialFacturasp(resultadop.facturas)
                console.log("totalesp:", resultadop.facturas.length)
            } else {
                setHistorialFacturasp([])
            }

            console.log(resultado, resultadop, resultadonp)
            
            // Cerrar el indicador de carga solo si se mostró
            if (mostrarCarga) {
                dismiss()
            }
        } catch (error) {
            console.error("Error al cargar facturas:", error)
            setHistorialFacturas([])
            if (mostrarCarga) {
                dismiss()
            }
        } finally {
            setCargandoFacturas(false)
        }
    }
    const abrirModalFacturas = async () => {
        // Si no hay cliente cargado, pedir iniciar sesión
        if (!idcliente) {
            setShowModalSesion(true)
            return
        }

        // Mostrar el modal de facturas inmediatamente
        setShowModal(true)
        setCargandoFacturas(true)

        try {
            // Cargar todas las facturas con indicador de carga
            await extraerdatosfactura(idcliente, true)
        } catch (error) {
            console.error("Error al cargar facturas:", error)
            setHistorialFacturas([])
        }
    }

    //modal sesion
    const [showModalSesion, setShowModalSesion] = useState(false)
    const [cargandoSesion, setCargandoSesion] = useState(false)
    const [showModalConfirmCerrar, setShowModalConfirmCerrar] = useState(false)
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
                const clienteId = oupt.datos[0].id
                setIdcliente(clienteId)
                setCedula(datos.cedula)
                setNombre(datos.nombre)
                setCorreo(datos.correo)
                setMovil(datos.movil)
                setDireccionPrincipal(datos.direccion_principal)
                setIp(oupt.datos[0].servicios[0].ip)
                setDatost(oupt.datos[0])
                setservicio(oupt.datos[0].servicios[0])
                
                // Guardar sesión en localStorage para persistencia en recargas
                try {
                    const sessionToSave = {
                        datost: oupt.datos[0],
                        idcliente: clienteId,
                        cedula: datos.cedula,
                        nombre: datos.nombre,
                        correo: datos.correo,
                        movil: datos.movil,
                        direccion_principal: datos.direccion_principal,
                        ip: oupt.datos[0].servicios[0].ip,
                        servicio: oupt.datos[0].servicios[0]
                    }
                    localStorage.setItem('portal_user', JSON.stringify(sessionToSave))
                } catch (err) {
                    console.error('Error guardando sesión en localStorage', err)
                }

                // Cargar facturas en segundo plano sin bloquear (después de 2 segundos)
                setTimeout(() => {
                    extraerdatosfactura(clienteId, false)
                }, 2000)
            }
            console.log("h: ", oupt.datos[0].nombre)

            console.log("ip: ", oupt.datos[0].servicios[0].ip)

        }).catch(err => {
            console.log(err)
        })
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
                passwors: sesionData.contrasena
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

    const cerrarSesion = () => {
        // Limpiar estado de sesión mínimamente
        setDatost(null)
        setIdcliente(undefined)
        setCedula("")
        setNombre("")
        setCorreo("")
        setMovil("")
        setIp("")
        setDireccionPrincipal("")
        setservicio(null)
        setHistorialFacturas([])
        setHistorialFacturasnp([])
        setHistorialFacturasp([])
        setShowModalConfirmCerrar(false)
        try {
            localStorage.removeItem('portal_user')
        } catch (err) {
            console.error('Error limpiando localStorage al cerrar sesión', err)
        }
    }

    const abrirModalConfirmCerrar = () => {
        setShowModalConfirmCerrar(true)
    }

    const cancelarCerrarSesion = () => {
        setShowModalConfirmCerrar(false)
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
    const crearNuevoTicket = async (info: any) => {
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
                        {datost && datost.id ? (
                            <button className="portal-btn portal-btn-ghost" onClick={abrirModalConfirmCerrar}>Cerrar Sesion</button>
                        ) : (
                            <button className="portal-btn portal-btn-primary" onClick={abrirmodalsesion}>Inicia Sesion</button>
                        )}
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
                            <button 
                                className="portal-btn portal-btn-primary portal-w-full" 
                                onClick={() => {
                                    if (datost?.estado === 'SUSPENDIDO') {
                                        alert('Su servicio se encuentra en suspensión. Por favor contacte al soporte para reactivarlo.')
                                    } else {
                                        autosoporte2()
                                    }
                                }}
                                disabled={datost?.estado === 'SUSPENDIDO'}
                                style={{opacity: datost?.estado === 'SUSPENDIDO' ? 0.5 : 1, cursor: datost?.estado === 'SUSPENDIDO' ? 'not-allowed' : 'pointer'}}
                            >
                                Auto Soprte
                            </button>
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

                {/* Modal de Confirmación de Cerrar Sesión */}
                {showModalConfirmCerrar && (
                    <div className="modal-overlay" onClick={cancelarCerrarSesion}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                            {/* Header del Modal */}
                            <div className="modal-header">
                                <h3 className="modal-title">Confirmar cierre de sesión</h3>
                                <button
                                    className="modal-close-btn"
                                    onClick={cancelarCerrarSesion}
                                >
                                    ×
                                </button>
                            </div>

                            {/* Body del Modal */}
                            <div className="modal-body">
                                <p style={{ textAlign: 'center', fontSize: '16px', color: '#333' }}>
                                    ¿Está seguro de que desea cerrar sesión?
                                </p>
                            </div>

                            {/* Footer del Modal */}
                            <div className="modal-footer">
                                <button
                                    className="portal-btn portal-btn-secondary"
                                    onClick={cancelarCerrarSesion}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="portal-btn portal-btn-primary"
                                    onClick={cerrarSesion}
                                    style={{ backgroundColor: '#d32f2f' }}
                                >
                                    Aceptar
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
                                    <div className="cargando-facturas" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: '20px' }}>
                                        <div style={{ fontSize: '48px' }}>⏳</div>
                                        <p style={{ fontSize: '18px', fontWeight: '500', color: '#333', margin: 0 }}>Cargando facturas...</p>
                                        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Por favor espere un momento</p>
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0901ffac', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0901ffac', animation: 'pulse 1.5s ease-in-out 0.3s infinite' }}></div>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0901ffac', animation: 'pulse 1.5s ease-in-out 0.6s infinite' }}></div>
                                        </div>
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