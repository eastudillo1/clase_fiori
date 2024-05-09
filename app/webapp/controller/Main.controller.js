sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/export/Spreadsheet",
    "sap/m/MessageToast",
    "sap/ui/export/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, MessageBox, JSONModel, Spreadsheet, MessageToast, exportLibrary) {
        "use strict";
        var EdmType = exportLibrary.EdmType;

        return Controller.extend("com.becloud.app.controller.Main", {
            onInit: function () {
                this.onBusyDialog("Open");
                this.getOwnerComponent().getModel().metadataLoaded().then(function () {
                    var oModelProducts = new JSONModel([]);
                    this.getView().setModel(oModelProducts, "oModelProducts");

                    var oModelProveedor = new JSONModel([]);
                    this.getView().setModel(oModelProveedor, "oModelProveedor");

                    var oModelCategorias = new JSONModel([]);
                    this.getView().setModel(oModelCategorias, "oModelCategorias");

                    this.getProducts().then(function (responseProducts) {
                        if (responseProducts.state) {
                            this.getProveedores().then(function (responseProveedor) {
                                this.getCategorias().then(function (responseCategoria) {

                                    this.onBusyDialog("Close");

                                    if (responseCategoria.state) {
                                        if (responseCategoria.rsp.length > 100) {
                                            oModelCategorias.setSizeLimit(responseCategoria.rsp.length);
                                        }
                                        oModelCategorias.setData(responseCategoria.rsp);
                                        oModelCategorias.refresh();
                                    } else {
                                        MessageBox.error(responseCategoria.msg, {
                                            title: "Obtención Categorias"
                                        });
                                    }

                                    if (responseProveedor.state) {
                                        if (responseProveedor.rsp.length > 100) {
                                            oModelProveedor.setSizeLimit(responseProveedor.rsp.length);
                                        }
                                        oModelProveedor.setData(responseProveedor.rsp);
                                        oModelProveedor.refresh();
                                    } else {
                                        MessageBox.error(responseProveedor.msg, {
                                            title: "Obtención Proveedores"
                                        });
                                    }

                                    if (responseProducts.rsp.length > 100) {
                                        oModelProveedor.setSizeLimit(responseProducts.rsp.length);
                                    }
                                    oModelProducts.setData(responseProducts.rsp)
                                    oModelProducts.refresh();
                                }.bind(this));
                            }.bind(this));
                        } else {
                            this.onBusyDialog("Close");
                            MessageBox.error(responseProducts.msg, {
                                title: "Obtención Productos"
                            });
                        }
                    }.bind(this));
                }.bind(this));
            },

            onResetFilters: function () {
                this.getView().byId("ipNombreProductoSearch").setValue();
                this.getView().byId("slEstadoSearch").setSelectedKey("0");
                this.getView().byId("slProveedorSearch").setSelectedKey();
                this.getView().byId("slCategoriaSearch").setSelectedKey();

                var oTable = this.getView().byId("idProductsTable");
                oTable.getBinding("items").filter([], sap.ui.model.FilterType.Application);
            },

            onCreate: function () {
                this.oViewCreate = sap.ui.xmlfragment("com.becloud.app.view.fragments.createProducto", this);
                this.getView().addDependent(this.oViewCreate);
                this.oViewCreate.addStyleClass(this.getOwnerComponent().getContentDensityClass());

                this.oViewCreate.attachAfterClose(function () {
                    this.oViewCreate.destroy();
                }.bind(this));

                this.getProveedores().then(function (responseProveedor) {
                    if (responseProveedor.state) {
                        this.oViewCreate.open();
                    } else {
                        this.oViewCreate.destroy();
                        //MESSAGE
                    }
                }.bind(this));
                /**
                 * 
                 * 
                 *  if (!this.oViewInformacion) {
                        this.oViewInformacion = sap.ui.xmlfragment("com.becloud.objetos.view.fragments.informacionUsuario", this);
                        this.getView().addDependent(this.oViewInformacion);
                    }
                    //INGRESAR FUNCION DE LIMPIEZA DE CAMPOS
                    var sPath = oEvent.getSource().getBindingContext("oModelUsuarios").sPath;
                    this.oViewInformacion.bindElement({
                        path: sPath,
                        model: "oModelUsuarios"
                    });
                    this.oViewInformacion.open();
                 */
            },

            onCloseCreate: function () {
                this.oViewCreate.close();
            },

            onSaveCreate: function () {
                debugger
                if (!this.validarCrear()) {
                    //OBTENER ID SOLO DESDE LA VISTA
                    //this.getView().byId("slEstadoSearch")

                    //OBTENER ID SOLO DESDE FRAGMENTS O DIALOGOS
                    //sap.ui.getCore().byId("ipNombreCrear")
                    var mombreProducto = sap.ui.getCore().byId("ipNombreCrear").getValue().trim();
                    var cantidadUnidad = sap.ui.getCore().byId("ipCantidadUnidadCrear").getValue().trim();
                    var precio = sap.ui.getCore().byId("ipPrecioCrear").getValue().trim();
                    var stock = sap.ui.getCore().byId("ipStockCrear").getValue().trim();
                    var pedidos = sap.ui.getCore().byId("ipPedidosCrear").getValue().trim();
                    var proveedor = sap.ui.getCore().byId("slProveedorCrear").getSelectedKey();
                    var categoria = sap.ui.getCore().byId("slCategoriaCrear").getSelectedKey();

                    var json = {
                        producto: mombreProducto,
                        cantidadUnidad: cantidadUnidad,
                        precio: precio,
                        stock: stock,
                        pedido: pedidos,
                        proveedorId: proveedor,
                        categoriaId: categoria
                    };




                    MessageBox.success("Se ha creado el producto correctamente.");
                    this.onCloseCreate();
                } else {
                    MessageBox.error("Complete todos los campos para continuar.", {
                        title: "Validación"
                    });
                }
            },

            onShowInformation: function (oEvent) {
                this.oViewInfoProduct = sap.ui.xmlfragment("com.becloud.app.view.fragments.informacionProducto", this);
                this.getView().addDependent(this.oViewInfoProduct);
                this.oViewInfoProduct.addStyleClass(this.getOwnerComponent().getContentDensityClass());

                this.oViewInfoProduct.attachAfterClose(function () {
                    this.oViewInfoProduct.destroy();
                }.bind(this));

                var nombreProducto = oEvent.getSource().getBindingContext("oModelProducts").getObject().ProductName;
                sap.ui.getCore().byId("dlgInfoProducto").setTitle("Producto seleccionado: " + nombreProducto);

                var sPath = oEvent.getSource().getBindingContext("oModelProducts").sPath;
                this.oViewInfoProduct.bindElement({
                    path: sPath,
                    model: "oModelProducts"
                });
                this.oViewInfoProduct.open();
            },

            onCloseInfoProduct: function () {
                this.oViewInfoProduct.close();
            },

            formatPhoto: function (photo) {
                if (photo) {
                    return "data:image/png;base64," + photo.substring(104)
                }
                return
            },

            onActive: function (oEvent) {
                var oModelProducts = this.getView().getModel("oModelProducts");
                var path = oEvent.getSource().getBindingContext("oModelProducts").getPath()
                path = path.split("/")[1];
                oModelProducts.getData()[path].Discontinued = false;
                oModelProducts.refresh();
                MessageToast.show("Se ha activado el producto seleccionado.")
            },

            onDesc: function (oEvent) {
                var oModelProducts = this.getView().getModel("oModelProducts");
                var path = oEvent.getSource().getBindingContext("oModelProducts").getPath()
                path = path.split("/")[1];
                oModelProducts.getData()[path].Discontinued = true;
                oModelProducts.refresh();
                MessageToast.show("Se ha descontinuado el producto seleccionado.")

            },

            changeFilter: function () {
                var producto = this.getView().byId("ipNombreProductoSearch").getValue().trim();
                var estado = this.getView().byId("slEstadoSearch").getSelectedKey();
                var proveedor = this.getView().byId("slProveedorSearch").getSelectedKey();
                var categoria = this.getView().byId("slCategoriaSearch").getSelectedKey();

                var oTable = this.getView().byId("idProductsTable");
                var filtros = [];

                if (producto !== "") {
                    var filtroNombre = new Filter({
                        path: "ProductName",
                        operator: sap.ui.model.FilterOperator.Contains,
                        value1: producto
                    });
                    filtros.push(filtroNombre);
                }

                if (estado !== "0") {
                    var status = true;
                    if (estado === "1") {
                        status = false
                    }
                    var filtroEstado = new Filter({
                        path: "Discontinued",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: status
                    });
                    filtros.push(filtroEstado);
                }

                if (proveedor !== "") {
                    var filtroProveedor = new Filter({
                        path: "SupplierID",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: proveedor
                    });
                    filtros.push(filtroProveedor);
                }

                if (categoria !== "") {
                    var filtroCategoria = new Filter({
                        path: "CategoryID",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: categoria
                    });
                    filtros.push(filtroCategoria);
                }
                oTable.getBinding("items").filter(filtros, sap.ui.model.FilterType.Application);
            },

            onExcel: function () {
                this.getProducts().then(function (response) {
                    if (response.state) {
                        if (response.rsp.length > 0) {
                            response.rsp.sort(function (a, b) {
                                if (a.ProductName < b.ProductName) {
                                    return -1;
                                }
                                if (a.ProductName > b.ProductName) {
                                    return 1;
                                }
                                return 0;
                            });

                            var aCols, oRowBinding, oSettings;
                            oRowBinding = response.rsp;
                            aCols = this.createColumnConfig();
                            oSettings = {
                                workbook: {
                                    columns: aCols,
                                    context: {
                                        sheetName: "Productos"
                                    }
                                },
                                dataSource: oRowBinding,
                                fileName: "lista_productos.xlsx"
                            };
                            new Spreadsheet(oSettings).build();
                        } else {
                            MessageBox.information("No se han encontrado registros para descargar.");
                        }
                    } else {
                        MessageBox.error(response.msg, {
                            title: "Obtención de datos"
                        });
                    }
                }.bind(this));
            },

            createColumnConfig: function () {
                var aCols = [];
                aCols.push({
                    label: "Proveedor",
                    type: EdmType.String,
                    property: "Supplier/CompanyName",
                    width: 30,
                    wrap: true
                });
                aCols.push({
                    label: "Nombre",
                    type: EdmType.String,
                    property: "ProductName",
                    width: 25,
                    wrap: true
                });
                aCols.push({
                    label: "Cantidad x Unidad",
                    type: EdmType.String,
                    property: "QuantityPerUnit",
                    width: 20,
                    wrap: true
                });
                aCols.push({
                    label: "Precio",
                    type: EdmType.String,
                    property: "UnitPrice",
                    width: 20,
                    wrap: true
                });
                aCols.push({
                    label: "Stock",
                    type: EdmType.Number,
                    property: "UnitsInStock",
                    width: 20,
                    wrap: true
                });
                aCols.push({
                    label: "Categoria",
                    type: EdmType.Number,
                    property: "Category/CategoryName",
                    width: 25,
                    wrap: true
                });
                aCols.push({
                    label: "Estado",
                    type: EdmType.Enumeration,
                    property: "Discontinued",
                    valueMap: {
                        true: "Descontinuado",
                        false: "Activo"
                    },
                    width: 20,
                    wrap: true
                });

                return aCols;
            },

            onRefresh: function () {
                this.onBusyDialog("Open");

                var oModelProducts = new JSONModel([]);
                this.getView().setModel(oModelProducts, "oModelProducts");

                this.getProducts().then(function (response) {
                    this.onBusyDialog("Close");
                    if (response.state) {
                        oModelProducts.setData(response.rsp)
                        oModelProducts.refresh();
                    } else {
                        MessageBox.error(response.msg, {
                            title: "Obtención de datos"
                        });
                    }
                }.bind(this));
            },

            updateFinished: function (oEvent) {
                var total = oEvent.getParameter("total")
                this.getView().byId("tProducts").setText("Registros (" + total + ")");
            },

            getCategorias: function () {
                return new Promise(
                    function resolver(resolve) {
                        this.getOwnerComponent().getModel().read("/Categories", {
                            success: function (oResult) {
                                resolve({
                                    state: true,
                                    rsp: oResult.results
                                });
                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        })
                    }.bind(this));
            },

            getProveedores: function () {
                return new Promise(
                    function resolver(resolve) {
                        this.getOwnerComponent().getModel().read("/Suppliers", {
                            success: function (oResult) {
                                resolve({
                                    state: true,
                                    rsp: oResult.results
                                });
                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        })
                    }.bind(this));
            },

            getProducts: function () {
                return new Promise(
                    function resolver(resolve) {
                        this.getOwnerComponent().getModel().read("/Products", {
                            urlParameters: {
                                "$expand": "Category,Supplier,Order_Details/Order"
                            },
                            success: function (oResult) {
                                resolve({
                                    state: true,
                                    rsp: oResult.results
                                });
                            }.bind(this),
                            error: function (oError) {
                                resolve({
                                    state: false,
                                    msg: oError.responseText
                                });
                            }.bind(this)
                        })
                    }.bind(this));
            },

            liveChange: function (oEvent) {
                var _oInput = oEvent.getSource();
                _oInput.setValueState("None");
            },

            onlyNumber: function (oEvent) {
                this.liveChange(oEvent);
                var _oInput = oEvent.getSource();
                var val = _oInput.getValue();
                val = val.replace(/[^\d]/g, '');
                _oInput.setValue(val);
            },

            validarCrear: function () {
                var fields = [{
                    id: 'ipNombreCrear',
                    type: "ip"
                }, {
                    id: 'ipCantidadUnidadCrear',
                    type: "ip"
                }, {
                    id: 'ipPrecioCrear',
                    type: "ip"
                }, {
                    id: 'ipStockCrear',
                    type: "ip"
                }, {
                    id: 'ipPedidosCrear',
                    type: "ip"
                }, {
                    id: 'slProveedorCrear',
                    type: "sl"
                }, {
                    id: 'slCategoriaCrear',
                    type: "sl"
                }];
                return this.validar(fields);

            },

            validar: function (fields) {
                var error = false;
                for (var i = 0; i < fields.length; i++) {
                    var type = fields[i].type;
                    var input = sap.ui.getCore().byId(fields[i].id);
                    if (type === "ip") {
                        var value = input.getValue();
                        if (value === "" || value.trim().length === 0) {
                            input.setValueState("Error");
                            error = true;
                        }
                    } else if (type === "fu") {
                        if (input.getValue() === "") {
                            input.setValueState("Error");
                            error = true;
                        }
                    } else {
                        if (input.getSelectedKey().trim() === "") {
                            input.setValueState("Error");
                            error = true;
                        }
                    }
                }
                return error;
            },

            formatterNA: function (sValue) {
                if (!sValue) {
                    return "N/A";
                } else {
                    return sValue;
                }
            },

            formatterActive: function (sValue) {
                var vis = true;
                if (!sValue) {
                    vis = false;
                }
                return vis;
            },

            formatterDesc: function (sValue) {
                var vis = false;
                if (!sValue) {
                    vis = true;
                }
                return vis;
            },

            formatterEstado: function (sValue) {
                var text = "Descontinuado";
                if (!sValue) {
                    text = "Activo";
                }
                return text;
            },

            formatterState: function (sValue) {
                var state = "Warning";
                if (!sValue) {
                    state = "Success";
                }
                return state;
            },

            onBusyDialog: function (Accion) {
                if (Accion === "Open") {
                    if (!this.oBusyDialog) {
                        this.oBusyDialog = sap.ui.xmlfragment("com.becloud.app.view.fragments.busyDialog", this);
                        this.oBusyDialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());
                    }
                    this.oBusyDialog.open();
                } else {
                    this.oBusyDialog.close();
                }
            }
        });
    });
