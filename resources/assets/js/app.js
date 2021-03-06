
new Vue({
    el:'#usurol',
    created() {

        this.getRoles();
        this.getExpirations();
        this.getusuarios();
        this.getBrands();
        this.getCategories();
        this.getProducts();
        this.getProviders();
        this.getPurchases();
        this.getStocks();
        this.getSales();

    },
    data: {
        //ventas
        insertProduct:'',
        insertCant:'',
        totalvent:[],
        ventId:1,
        Newventa:[],
        sales:[],

        //clientes
        fillclient:{
            'ci':'',
            'name':'',
            'last_name':'',
            'birthdate':'',
            'phone':'',
            'email':''
        },

        pagination:{
            'total'         :0,
            'current_page'  :0,
            'per_page'      :0,
            'last_page'     :0,
            'from'          :0,
            'to'            :0
        },   //paaginar tablas

        //usuario
        usuarios:[],//llenar datos para el listado
        newUser:{
            'name':'',
            'last_name':'',
            'ci':'',
            'birthdate':'',
            'address':'',
            'photo':'',
            'phone':'',
            'gender':'',
            'civil_status':'',
            'country':'',
            'nationality':'',
            'email':'',
            'password':'',
            'password_confirmation':'',
            'role_id':''
        },  //llenar datos de nuevo usuario
        fillUser: {
            'id': '',
            'name': '',
            'email': '',
            'role_id': ''
        },  //llenar datos de un usuario para editar u otra cosa
        userId: '',//llena el id del usuario

        //marca
        newBrand:{
            'name':'',
        },  //llenar datos de nueva marca
        brands:[], //llena datos de la marca para listar

        //categorias
        categories:[],//llena datos para listar
        newCategory:{
            'name':'',
        },//llena datos para nueva cateforia

        //roles
        roles:[],//llena datos del controlador para listar rol
        newRole:{
            'name': '',
            'slug': '',
            'description': '',
            permissions:[]
        }, //llena datos para ingresar nuevo rol

        //productos
        products:[],//llena datos del controlador para listar productos
        newProduct:{
            'barcode':'',
            'name':'',
            'description':'',
            'price':'',
           // 'photo':'',
            'brand_id':'',
            'category_id':'',
            'maximum':'',
            'minimum':'',

            'date_purchase':'',
            'expiration_date':'',
            'stock':'',
        },//llena datos para agregar nuevo producto
        fillProduct:{
            'id':'',
            'barcode':'',
            'name':'',
            'description':'',
            'price':'',
            'photo':'',
            'brand_id':'',
            'category_id':'',
            'maximum':'',
            'minimum':'',
        },//llenar datos de un producto para editar u otra cosa
        stocks:[],//el stock de cada producto

        //fecha de vencimiento
        expirations:[], //muestra todos los productos del stock

        //compras
        newPurchases:{
            'quantity':'',
            'date_purchase':'',
            'expiration_date':'',
            'product_id':'',
            'provider_id':''
        },//llena datos para agregar nueva compra
        purchases:[],//llena toda las compras

        //proveedores
        providers:[],//llena datos del controlador para listar proveedores
        newProvider:{
            'name':'',
            'phone':'',
            'mobile':'',
            'email':'',
            'observation':'',
            'address':'',
            'web_page':'',
        },//llena datos para el nuevo proveedor

        //otros
        errors: '',//lista los errores de validacion


    },

    computed:{
      sumar(){

            var resul=0;
            //
            //   for (indice in this.Newventa){
            //       resul= parseInt( this.products.map(function (dato) {
            //           if (this.Newventa[indice]['products']==dato.barcode){
            //               return dato.price;
            //           }
            //       }))
            //   }
            //
            // return resul;

      }
    },
    methods: {

        //ventas
        NewsVenta(){
            if (this.insertCant==''){
                this.insertCant=1;
            }
            var x="cambio";
            var y=this.insertProduct;
            var z=this.insertCant;
           if (this.Newventa.length>0) {
                this.Newventa.map(function (dato) {
                    if (dato.product==y){
                        dato.quantity=parseInt(dato.quantity)+parseInt(z);

                        x="nada"
                    }
                    return dato;
                });
            }else{
                this.Newventa.push({ product: this.insertProduct, quantity: this.insertCant});
                x="nada"
            }
            if (x=="cambio"){
                this.Newventa.push({product: this.insertProduct, quantity: this.insertCant});
            }

            this.insertProduct='';
            this.insertCant='';

        },
        deletevent:function(index){
            console.log(this.Newventa[index].product);
            this.Newventa.splice(index,1);
        },
        getSales(){
          var url = 'sale';
          axios.get(url).then(response=>{
              this.sales=response.data;
          });
        },

        //guardar ventas
        StoreSale(){
            var url ='sale';
            axios.post(url, {
                'sales':this.Newventa,
                'ci':this.fillclient.ci,
                'name':this.fillclient.name,
                'last_name':this.fillclient.last_name,
                'birthdate':this.fillclient.birthdate,
                'phone':this.fillclient.phone,
                'email':this.fillclient.email,
                'total':this.Newventa.length,
            }).then(response=>{
                this.Newventa=[];
                this.getSales();
                $('#createSale').modal('hide');
                toastr.success('Nuevo Salida realizada');
            }).catch(error => {
                console.log(error.response)
            });
        },

        //usuarios
        getusuarios() {
            var urlUsers = 'user';
            axios.get(urlUsers).then(response => {
                this.usuarios=response.data;

            });
        },//carga todos los usuarios del data usuarios[]
        editUser(user){
            this.fillUser.id=user.id;
            this.fillUser.name=user.name;
            this.fillUser.email=user.email;
            this.fillUser.role_id=user.role_id;
            $('#edit').modal('show');
        },//edita usuario
        updateUser: function(id){
            var url = 'user/'+id;
            axios.put(url, this.fillUser).then(response =>{
                this.getUsers();
                this.fillUser= {
                    'id': '',
                    'name': '',
                    'email': '',
                    'role_id': '',
                };
                this.errors = [];
                $('#edit').modal('hide');
                toastr.success('Usuario actualizada con exito ');

            }).catch(error=>{

                this.errors = error.response.data.errors;

            });
        },//actualiza usuario
        storeUser (){
            var url ='register';
            axios.post(url, {
                'name':this.newUser.name,
                'last_name':this.newUser.last_name,
                'ci':this.newUser.ci,
                'birthdate':this.newUser.birthdate,
                'address':this.newUser.address,
                'photo':this.newUser.photo,
                'phone':this.newUser.phone,
                'gender':this.newUser.gender,
                'civil_status':this.newUser.civil_status,
                'country':this.newUser.country,
                'nationality':this.newUser.nationality,
                'email':this.newUser.email,
                'password':this.newUser.password,
                'password_confirmation':this.newUser.password_confirmation,
                'role_id':this.newUser.role_id
            }).then(response =>{
                this.getUsers();
                this.newUser='';
                this.errors=[];
                $('#createUser').modal('hide');
                toastr.success('Nuevo Usuario creada con éxito');
            }).catch(error=>{
                this.errors = error.response.data.errors;

            })
        },//guarda nuevo usuario

        //rol
        storeRole() {
            var url = 'role';

            axios.post(url, {
                'name': this.newRole.name.toUpperCase(),
                'slug': this.newRole.slug.toUpperCase(),
                'description': this.newRole.description,
                'permissions': this.newRole.permissions
            }).then(response => {
                this.getRoles();
                this.newRole = '';
                this.errors = [];
                $('#create').modal('hide');
                Swal.fire(
                    'Creado!',
                    'Usuario se creo exitosamente.',
                    'success'
                )
            }).catch(error => {
                this.errors = error.response.data.errors;
            });


        },//guarda nuevo rol
        getRoles() {
            var urlRoles = 'role';
            axios.get(urlRoles).then(response => {
                this.roles=response.data
            });
        },//carga todos los roles del data roles:[]

        deleteRole(role) {
            var url ='role/'+ role.id;


            Swal.fire({
                title: '¿Estás seguro?',
                text: '¡No podrás revertir esto.!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    axios.delete(url).then(response => {
                        this.getRoles();
                        Swal.fire(
                            'Borrado!',
                            'El rol se borro exitosamente.',
                            'success'
                        )
                    });

                }
            })
        }, //elimina el rol


        //productos
        getProducts(){
            var url ='product';
            axios.get(url).then(response=>{
                this.products=response.data;

            });
        },//carga todos los productos del data products[]
        storeProduct(){
            var url='product';
            axios.post(url,{
                'barcode':this.newProduct.barcode,
                'name':this.newProduct.name,
                'description':this.newProduct.description,
                'price':this.newProduct.price,
                //  'photo':this.newProduct.photo,
                'brand_id':this.newProduct.brand_id,
                'category_id':this.newProduct.category_id,
                'maximum':this.newProduct.maximum,
                'minimum':this.newProduct.minimum,

                'date_purchase':this.newProduct.date_purchase,
                'expiration_date':this.newProduct.expiration_date,
                'stock':this.newProduct.stock,
            }).then(reponse=>{
                this.getProducts();
                this.newProduct='';
                $('#createCategory').modal('hide');
                toastr.success('Nueva marca creada');
            }).catch(error=>{
                this.errors = error.response.data.errors;
                toastr.success('algo salio mal');
            })
        },//guarda todos los productos
        deleteProduct(product){

            var url='product/'+product.id;
            Swal.fire({
                title: '¿Estás seguro?',
                text: '¡No podrás revertir esto.!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    axios.delete(url).then(response => {
                        this.getProducts();
                        toastr.success('EL producto se borro satisfactoriamente')
                    });

                }
            })
        },//borra un producto
        getStocks(){
            var url='stock';
                axios.get(url).then(response=>{
                this.stocks=response.data
            })
        },

        //fecha de vencimiento
        getExpirations(){
            var url ='expiration';
            axios.get(url).then(response=>{
                this.expirations=response.data
            });
        },

        //compras
        getPurchases(){
            var url='purchase';
            axios.get(url).then(response=>{
                this.purchases=response.data
            });
        },//llena datos a purchases[]
        shopingProduct(product) {
            this.fillProduct.id   = product.id;
            this.newPurchases.product_id = product.id;
            $('#purchases').modal('show');
        },//abre un modal para la compra de un producto

        storePurchase(){
            var url='purchase';
            axios.post(url,{
                'quantity':this.newPurchases.quantity,
                'date_purchase':this.newPurchases.date_purchase,
                'expiration_date':this.newPurchases.expiration_date,
                'product_id':this.newPurchases.product_id,
                'provider_id':this.newPurchases.provider_id,
            }).then(response=>{
                this.getExpirations();
                this.getProducts();
                this.getStocks();
                this.newPurchases='';
                $('#purchases').modal('hide');
                toastr.success('Nueva compra realizada');
            }).catch(error=>{
                this.errors = error.response.data.errors;
                toastr.success('algo salio mal');
            })

            },//almacena o guarda la compra

        //proveedores
        getProviders(){
          var url ='provider';
          axios.get(url).then(response=>{
              this.providers=response.data
          })
        },//carga todos los proveedores del data providers[]
        storeProvider(){
            var url ='provider';
            axios.post(url,{
                'name':this.newProvider.name,
                'phone':this.newProvider.phone,
                'mobile':this.newProvider.mobile,
                'email':this.newProvider.email,
                'observation':this.newProvider.observation,
                'address':this.newProvider.address,
                'web_page':this.newProvider.web_page
            }).then(response=>{
                this.getProviders();
                this.newProvider='';
                $('#createProvider').modal('hide');
                toastr.success('Nuevo Proveedor creado');
            }).catch(error=>{
                this.errors = error.response.data.errors;
                toastr.success('algo salio mal');
            })
        },//guarda nuevo proveedor

        //Marcas
        storeBrand(){
            var url = 'brand';
            axios.post(url,{
                'name':this.newBrand.name,
            }).then(response =>{
                this.getBrands();
                this.newBrand='';
                this.errors=[];
                $('#createBrand').modal('hide');
                toastr.success('Nueva marca creada');
            }).catch(error=>{
                this.errors = error.response.data.errors;
                toastr.success('algo salio mal');

            })

        },//guarda nueva marca
        modalBrand(){
            $('#createBrand').modal('show')
        },//abre modal para una nueva marca
        getBrands() {
            var urlBrands = 'brand';
            axios.get(urlBrands).then(response => {
                this.brands=response.data
            });
        },//carga todos las marcas del data brands[]

        //categoria
        modalCategory(){
          $('#createCategory').modal('show')
        },//abre ventana modal para el registro de nueva categoria
        storeCategory(){
            var url = 'category';
            axios.post(url,{
                'name':this.newCategory.name,
            }).then(response=>{
                this.getCategories();
                this.newCategory='';
                this.errors=[];
                $('#createCategory').modal('hide');
                toastr.success('Nueva categoria creada');
            }).catch(error=>{
                this.errors = error.response.data.errors;
                toastr.success('algo salio mal');
            })
        },//guarda nueva categoria
        getCategories(){
            var url='category';
            axios.get(url).then(response=>{
                this.categories=response.data
            });
        },//carga todas las categorias del data categories[]

        //reportes








    changePage: function (page) {
        this.pagination.current_page=page;
        this.getUsers(page)
    }
    },
});
