sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast, JSONModel, FilterOperator, Filter) {
        "use strict";

        return Controller.extend("com.becloud.objetos.controller.Main", {
            onInit: function () {
                this.ID_USUARIO = 1;
                this.permisosDialogo = false;
                this.permisosDialogo = true;
                /*this.getProductos().then(function (response) {

                }.bind(this));*/
                /*var oMessage = new sap.m.MessageBox({
                    title: "Message Box",
                    details: ""
                });*/
                /*var json = {
                    codigo: "404",
                    msg: "Not found",
                    detalles: "dhasjdhaskdasjkdasj 39283 kdjsakdjas"
                };
                MessageBox.error("Ha ocurrido un error al crear la solicitud", {
                    details: json
                });*/

                //MessageToast.show("Mensaje MessageToast")
                /*var oLabel = new sap.m.Label({
                    text: "Creado desde controlador",
                    required: true
                });*/
                //this.getView().byId("vbox1").addItem(oLabel);

                var array = [{
                    ID: 1,
                    NOMBRE: "ELIAS",
                    APELLIDO: "ASTUDILLO",
                    CORREO: "EASTUDILLO@BECLOUD.CL",
                    ESTADO: 1,
                    EDIT: 1,
                    VISIBLE: 1
                }, {
                    ID: 2,
                    NOMBRE: "ELIAS2",
                    APELLIDO: "ASTUDILLO2",
                    CORREO: "EASTUDILLO2@BECLOUD.CL",
                    ESTADO: 2,
                    EDIT: 1,
                    VISIBLE: 1
                }, {
                    ID: 3,
                    NOMBRE: "ELIAS2",
                    APELLIDO: "ASTUDILLO2",
                    CORREO: "EASTUDILLO2@BECLOUD.CL",
                    ESTADO: 2,
                    EDIT: 1,
                    VISIBLE: 1
                }, {
                    ID: 4,
                    NOMBRE: "ELIAS2",
                    APELLIDO: "ASTUDILLO2",
                    CORREO: "EASTUDILLO2@BECLOUD.CL",
                    ESTADO: 2,
                    EDIT: 1,
                    VISIBLE: 1
                }, {
                    ID: 5,
                    NOMBRE: "ELIAS2",
                    APELLIDO: "ASTUDILLO2",
                    CORREO: "EASTUDILLO2@BECLOUD.CL",
                    ESTADO: 2,
                    EDIT: 1,
                    VISIBLE: 1
                }, {
                    ID: 6,
                    NOMBRE: "ELIAS2",
                    APELLIDO: "ASTUDILLO2",
                    CORREO: "EASTUDILLO2@BECLOUD.CL",
                    ESTADO: 2,
                    EDIT: 1,
                    VISIBLE: 1
                }, {
                    ID: 7,
                    NOMBRE: "ELIAS2",
                    APELLIDO: "ASTUDILLO2",
                    CORREO: "EASTUDILLO2@BECLOUD.CL",
                    ESTADO: 2,
                    EDIT: 1,
                    VISIBLE: 1
                }];

                var oModelUsuarios = new JSONModel(array);
                this.getView().setModel(oModelUsuarios, "oModelUsuarios");
                //this.lecturaArreglo();

                //LLAMADA FUNCION BASICA
                var roles = "1";
                //this.funcionBasica(roles);

                //LLAMADA FUNCION ONPROMISE  
                /*this.funcionOnPromise(1).then(function (response) {
                    if (response.state) {
                        this.getRolesUsuario(response.rsp).then(function (responseRol) {
                            if (!responseRol.state) {
                                MessageBox.error("Ha ocurrido un error al obtener los datos del usuario", {
                                    details: responseRol.msg
                                });
                            }
                            this.funcionBasica();
                        }.bind(this));
                    } else {
                        MessageBox.error("Ha ocurrido un error al obtener los datos del usuario", {
                            details: response.msg
                        });
                    }
                }.bind(this));*/

                //LLAMADA FUNCION RECURSIVA
                var usuarios = [{
                    ID: 1,
                    NOMBRE: "ELIAS",
                    APELLIDO: "ASTUDILLO",
                    CORREO: "EASTUDILLO@BECLOUD.CL",
                    ESTADO: 1,
                    EDIT: 1,
                    VISIBLE: 1
                }, {
                    ID: 2,
                    NOMBRE: "ELIAS2",
                    APELLIDO: "ASTUDILLO2",
                    CORREO: "EASTUDILLO2@BECLOUD.CL",
                    ESTADO: 2,
                    EDIT: 1,
                    VISIBLE: 1
                }, {
                    ID: 3,
                    NOMBRE: "ELIAS2",
                    APELLIDO: "ASTUDILLO2",
                    CORREO: "EASTUDILLO2@BECLOUD.CL",
                    ESTADO: 2,
                    EDIT: 1,
                    VISIBLE: 1
                }];

                /*for (var i = 0; i < usuarios.length; i++) {
                    this.createUsuario(model[j]).then(function (responseRol) {
                        if (responseRol.state) {
                            j++;
                            recursiva(j, model, totals);
                        } else {
                            errores.push({
                                msg: responseRol.msg,
                                usuario: model[j].ID,
                                correo: model[j].CORREO,
                            });
                            j++;
                            recursiva(j, model, totals);
                        }
                    }.bind(this));
                }*/

                /*this.funcionRecursiva(0, usuarios, usuarios.length).then(function (response) {
                    if (response.state) {
                        MessageBox.success("Se han creado los registros con éxito.");
                    } else {
                        MessageBox.error("Los siguientes usuarios no se crearon", {
                            details: response.errores
                        });
                    }
                }.bind(this));*/
            },


            //READ CALL ERP
            getProductos: function () {
                return new Promise(
                    function (resolve) {
                        /*var andFilters = [];
                        andFilters.push(new Filter({
                            path: "ProductName",
                            operator: sap.ui.model.FilterOperator.EQ,
                            value1: "7000"
                        }));
                        andFilters.push(new Filter({
                            path: "IStcd1",
                            operator: sap.ui.model.FilterOperator.EQ,
                            value1: "18382192-K"
                        }));*/

                        this.getOwnerComponent().getModel("Northwind").read("/Products", {
                            success: function (oResult) {
                                debugger
                                resolve({
                                    state: true,
                                    arr: oResult
                                });
                            }.bind(this),
                            error: function (oError) {
                                debugger
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        });
                    }.bind(this));
            },

            //CREATE CALL ERP
            createServiceErp: function () {
                return new Promise(
                    function (resolve) {
                        var data = {
                            ID: 1,
                            NOMBRE: ""
                        };
                        this.getOwnerComponent().getModel("oModelSap").create('/PdfFichaRendicionSet', data, {
                            success: function (oResult) {
                                var base64 = oResult.NavPdfFichaRendicionForm.EPdf;
                                resolve({
                                    state: true,
                                    rsp: base64
                                });
                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        });
                    }.bind(this));
            },

            //UPDATE CALL ERP
            updateServiceERP: function () {
                return new Promise(
                    function (resolve) {
                        var data = {
                            NumOda: registro.NumOda,
                            IdArchivoSh: registro.IdArchivoSh,
                            NombreArchivo: registro.NombreArchivo,
                            PesoArchivo: registro.PesoArchivo,
                            ExtensionArchivo: registro.ExtensionArchivo,
                            RutaSharepoint: registro.RutaSharepoint,
                            Usuario: registro.Usuario,
                            CorreoUsuario: registro.CorreoUsuario,
                            IdCarpeta: registro.IdCarpeta,
                            TipoArchivo: "1",
                            EstadoArchivo: " ",
                            Aux1: "",
                            Aux2: "",
                            Aux3: "",
                            Aux4: "",
                            Aux5: ""
                        };
                        var path = "/ArchivoSet('" + archivoId + "')";
                        this.getOwnerComponent().getModel("oModelSap").update(path, data, {
                            success: function () {
                                resolve({
                                    state: true
                                });
                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        });
                    }.bind(this));
            },

            //CREATE
            serviceCreate: function (json) {
                return new Promise(
                    function (resolve) {
                        var version = "1";
                        var fechaActualizacion = new Date();

                        this.getOwnerComponent().getModel().createEntry('/Usuarios', {
                            properties: {
                                ID_FICHA_PROCESO: 0,
                                VERSION: version,
                                FECHA_ACTUALIZACION: this.fechaActualizacion,
                                OBJETIVO: objetivo,
                                ALCANCE: alcance,
                                ID_CATEGORIA: categoria
                            },
                            success: function (oResult) {
                                this.idFichaProceso = oResult.ID_FICHA_PROCESO
                                resolve({
                                    state: true,
                                    rsp: oResult
                                });
                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        });

                        this.getView().getModel().submitChanges({
                            success: function (oResult) {

                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        });
                    }.bind(this));
            },
            //READ
            getReadTable: function () {
                return new Promise(
                    function resolver(resolve) {
                        this.getOwnerComponent().getModel().read("/Ficha_Proceso", {
                            urlParameters: {
                                "$expand": "Ficha_ProcesoToCategoria,Ficha_ProcesoToCliente,Ficha_ProcesoToProveedor,Ficha_ProcesoToEntrada,Ficha_ProcesoToResultado,Ficha_ProcesoToRiesgo,Ficha_ProcesoToOportunidad"
                            },
                            success: function (oResponse) {
                                var resultados = oResponse.results;
                                if (resultados.length === 0) {
                                    resolve({
                                        state: false,
                                        msg: "No se encontraron datos en la tabla",
                                        codigo: 1
                                    });
                                } else {
                                    resolve({
                                        state: true,
                                        arr: oResponse.results
                                    });
                                }
                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText,
                                    codigo: 2
                                });
                            }.bind(this)
                        });

                    }.bind(this));
            },

            //UPDATE
            updateService: function () {
                return new Promise(
                    function (resolve) {

                        var sPathRendicion = this.getModel().createKey("/Rendicion", {
                            ID_RENDICION: this.rendicion
                        });

                        var oEntry = {
                            ESTADO: 5
                        };

                        this.getOwnerComponent().getModel().update(sPathRendicion, oEntry, {
                            success: function (oResult) {
                                resolve({
                                    state: true,
                                    msg: "OK"
                                });
                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        });

                        this.getOwnerComponent().getModel().submitChanges({
                            success: function (oResult) {

                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        });
                    }.bind(this));
            },

            //REMOVE

            removeService: function () {
                return new Promise(
                    function (resolve) {

                        //REMOVE

                        var key_delete = this.getView().getModel().createKey("/Ficha_Proceso", {
                            ID_FICHA_PROCESO: idFicha
                        });
                        this.getOwnerComponent()().getModel().remove(key_delete, {
                            success: function (oResult) {
                                resolve({
                                    state: true,
                                    msg: "OK"
                                });
                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        });

                        this.getOwnerComponent().getModel().submitChanges({
                            success: function (oResult) {

                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        });
                    }.bind(this));
            },

            funcionRecursiva: function (i, arr, total) {
                return new Promise(
                    function resolver(resolve) {
                        var outPut = [];
                        var errores = [];
                        var creados = [];
                        //LA EJECUCION DE LA FUNCION
                        var recursiva = function (j, model, totals) {
                            if (j === totals) {
                                if (errores.length > 0) {
                                    resolve({
                                        state: false,
                                        errores: errores,
                                        creados: creados
                                    });
                                } else {
                                    resolve({
                                        state: true
                                    });
                                }
                            } else {
                                if (model[j].ID === "") {
                                    resolve({
                                        msg: "el id no se encontro"
                                    });
                                }
                                this.createUsuario(model[j]).then(function (responseRol) {
                                    if (responseRol.state) {
                                        creados.push({
                                            msg: responseRol.msg,
                                            usuario: model[j].ID,
                                            correo: model[j].CORREO,
                                        });
                                        j++;
                                        recursiva(j, model, totals);
                                    } else {
                                        errores.push({
                                            msg: responseRol.msg,
                                            usuario: model[j].ID,
                                            correo: model[j].CORREO,
                                        });
                                        j++;
                                        recursiva(j, model, totals);
                                    }
                                }.bind(this));
                            }
                        }.bind(this);

                        //LA LLAMADA A LA FUNCION
                        recursiva(i, arr, total);
                    }.bind(this));
            },

            createUsuario: function (json) {
                return new Promise(
                    function resolver(resolve) {
                        var url = "www.servicios.com/createUsuario";
                        var url = "https://services.odata.org/V2/Northwind/Northwind.svc/categoriesSet"

                        $.ajax({
                            url: url,
                            method: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(json),
                            success: function (oResult) {
                                debugger
                                resolve({
                                    state: true,
                                    rsp: oResult
                                });
                            }.bind(this),
                            error: function (oError) {
                                debugger
                                var msg = "Ha ocurrido un error al conectarse con el servidor.";
                                if (oError.responseText) {
                                    msg = oError.responseText;
                                }
                                resolve({
                                    state: false,
                                    msg: msg
                                });
                            }.bind(this)
                        });
                    }.bind(this));
            },

            funcionOnPromise: function (ID_USUARIO) {
                return new Promise(
                    function resolver(resolve) {
                        var url = "/HANA/RINDE_FONDOS/getRendicion.xsjs?cmd=getRendicion";
                        var url = "www.getUsuarios.com/getUsuariosById";
                        var json = {
                            ID_USUARIO: ID_USUARIO
                        };

                        $.ajax({
                            url: url,
                            method: "GET",
                            contentType: "application/json",
                            data: JSON.stringify(json),
                            success: function (oResult) {
                                resolve({
                                    state: true,
                                    rsp: oResult
                                });
                            }.bind(this),
                            error: function (oError) {
                                var msg = "Ha ocurrido un error al conectarse con el servidor.";
                                if (oError.responseText) {
                                    msg = oError.responseText;
                                }
                                resolve({
                                    state: false,
                                    msg: msg
                                });
                            }.bind(this)
                        });
                    }.bind(this));
            },

            funcionBasica: function (roles) {
                debugger
            },

            usuarioEditado: function (oEvent) {

            },

            //CREACION DIALOGO O FRAGMENT
            onPressInformacion: function (oEvent) {
                debugger
                if (this.ID_USUARIO !== 1) {
                    if (!this.oViewInformacion) {
                        this.oViewInformacion = sap.ui.xmlfragment("com.becloud.objetos.view.fragments.informacionUsuario", this);
                        this.getView().addDependent(this.oViewInformacion);
                    }
                    var sPath = oEvent.getSource().getBindingContext("oModelUsuarios").sPath;
                    this.oViewInformacion.bindElement({
                        path: sPath,
                        model: "oModelUsuarios"
                    });
                    this.oViewInformacion.open();
                } else {
                    MessageBox.information("Usted no tiene acceso para ver la información");
                }
            },

            onCloseInformacion: function () {
                this.oViewInformacion.close();
            },

            lecturaArreglo: function () {
                var datos = this.getView().getModel("oModelUsuarios").getData();
                for (var i = 0; i < datos.length; i++) {
                    datos[i].ESTADO = this.formatterEstado(datos[i].ESTADO);
                }
            },

            onPressUsuario: function (oEvent) {
                var ID_USUARIO = oEvent.getSource().getBindingContext("oModelUsuarios").getObject().ID;
            },

            formatterTextVisible: function (sValue) {
                var text = "Activo";
                if (sValue === 2) {
                    text = "Inactivo";
                }
                return text
            },

            formatterVisible: function (sValue) {
                var visible = true;
                if (sValue === 2) {
                    visible = false;
                }
                return visible
            },

            formatterEdit: function (sValue) {
                var editable = true;
                if (sValue === 2) {
                    editable = false;
                }
                return editable
            },

            formatterEstado: function (sValue) {
                var textoEstado = "Activo";
                if (sValue === 2) {
                    textoEstado = "Inactivo";
                }
                return textoEstado
            },

            formatterColor: function (sValue) {
                var textoEstado = "Success";
                if (sValue === 2) {
                    textoEstado = "Error";
                }
                return textoEstado
            },

            eventoLiveChange: function (oEvent) {
                var textoIngresado = oEvent.getParameter('value');
                //FORMA 1
                //var titulo = this.getView().byId("title4");
                //titulo.setText(textoIngresado);

                //FORMA 2
                //this.getView().byId("title4").setText(textoIngresado);

            }
        });
    });
