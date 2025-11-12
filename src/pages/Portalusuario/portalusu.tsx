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


const Iniciopagina: React.FC = () => {
    // Estados para almacenar los datos
    const [idcliente, setIdcliente] = useState("")
    const [cedula, setCedula] = useState("")
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [movil, setMovil] = useState("")
    const [direccion_principal, setDireccionPrincipal] = useState("")
    const [datost, setDatost] = useState<any>(null)

    // useEffect para cargar los datos cuando el componente se monta
    useEffect(() => {
        Consultas("1208407401").then(oupt => {
            if (oupt.estado == "exito") {
                let datos = oupt.datos[0]
                setIdcliente(oupt.datos[0].id)
                setCedula(datos.cedula)
                setNombre(datos.nombre)
                setCorreo(datos.correo)
                setMovil(datos.movil)
                setDireccionPrincipal(datos.direccion_principal)
                setDatost(oupt.datos[0])
            }
            console.log("h: ", oupt.datos[0].nombre)
            console.log("dt: ", nombre)
        }).catch(err => {
            console.log(err)
        })
    }, []) // El array vacío [] significa que se ejecuta solo una vez

    return (
        <div className="portal-container" style={{ height: '100vh', overflowY: 'auto' }}>
            <Navbar />

            <main className="portal-main">
                {/* Header Section */}
                <div className="portal-card portal-header-section">
                    <div>
                        <h1 className="portal-title">Portal de cliente</h1>
                        <h2 style={{ color: '#E60000', margin: '10px 0' }}>
                            Cliente: {nombre || 'Cargando...'}
                        </h2>
                        <p className="portal-subtitle">Autoservicio para clientes residenciales y empresariales.</p>
                    </div>
                    <div className="portal-flex portal-gap-2">
                        <button className="portal-btn portal-btn-primary" >Ingresar</button>
                        <button className="portal-btn portal-btn-ghost">Crear cuenta</button>
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
                                    {datost?.servicios?.[0]?.perfil || '130 Mbps'}
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
                                    {datost?.estado || 'ACTIVO'}
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
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-text-dark">Facturas pendientes</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {datost?.facturacion?.facturas_nopagadas || 0}
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-text-dark">Total a pagar</span>
                                <span className="portal-font-medium portal-text-dark">
                                    ${datost?.facturacion?.total_facturas || '0.00'}
                                </span>
                            </div>
                            <button className="portal-btn portal-btn-ghost portal-w-full portal-mt-2">Ver historial</button>
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
                            <button className="portal-btn portal-btn-primary portal-w-full">Nuevo ticket</button>
                            <button className="portal-btn portal-btn-ghost portal-w-full">Ir al whatsapp</button>
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
                                <span className="portal-font-medium portal-text-dark">Serial</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {datost?.servicios?.[0]?.onu_sn || 'No disponible'} 
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-font-medium portal-text-dark">Tipo de servicio</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {datost?.Tipo_de_Servicio || 'FTTH'}
                                </span>
                            </div>
                            <div className="portal-flex portal-items-center portal-justify-between">
                                <span className="portal-font-medium portal-text-dark">Dirección</span>
                                <span className="portal-font-medium portal-text-dark">
                                    {direccion_principal || 'No disponible'}
                                </span>
                            </div>
                            <button className="portal-btn portal-btn-primary portal-w-full">Gestionar Wifi</button>
                        </div>
                    </div>

                    {/* Herramientas Card */}
                    <div className="portal-card portal-p-5">
                        <div className="portal-section-title">Herramientas</div>
                        <div className="portal-text-sm portal-flex portal-flex-col portal-gap-2 portal-mt-2">
                            <button className="portal-btn portal-btn-primary portal-w-full">Test de velocidad</button>
                            <button className="portal-btn portal-btn-ghost portal-w-full">Status de red</button>
                            <button className="portal-btn portal-btn-ghost portal-w-full">Reportar pago</button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Iniciopagina;