/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//var lstTarima = [];
//var urlHandler = 'http://192.168.1.66:82/';
var urlHandler = 'http://yaaxil.ddns.net:82/';
var oUsuario;
var oCAEController = new CAEController();
var menuAct = 'inicio';
var Tarima = function(tarima, posicion) {
    this.Tarima = tarima;
    this.Posicion = posicion;
}
var oIndexCtrl = new IndexController();

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType; 
        app.receivedEvent('deviceready');
        FastClick.attach(document.body);
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        try {
            //oCtrlr.InitMenu(); 
            oCAEController.Create('login');
        } catch (error) {
            alert(error.message);
        }
        
        
        //console.log('Received Event: ' + id);
        //x$('.loading').removeClass('loading').addClass('ready');
        //x$('#btn_set').on('click', function (event) {
        //    addTarima();
        
        //});
        //x$('#btn_get').on('click', function (event) {
        //    alert(localStorage.getItem('tarima'));
        //});
        
        //x$('#btn_clear').on('click', function (event) {
        //    localStorage.clear();
        //    alert('Se ha limpiado correctamente la información');
        //});
    }
};

/*
function myFunction() {
    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
}

function addTarima(){
    var oTar;
    for(var i=1; i<4815; i++){
        oTar = new Tarima('TAR_' + i,'POS_' + 1);
        lstTarima.push(oTar);
    }
    
    localStorage.setItem("tarima", JSON.stringify(lstTarima));
}*/