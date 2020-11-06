var BASE_URL='http://10.7.0.18/intranet/';
var SITE_URL='http://10.7.0.18/intranet/index.php/';
var imgupload = BASE_URL + '/assets/images/upload.jpg';
var msg_erreur = 'Une Erreur est survenue sur le serveur, veuillez contacter le support technique';

function showModalRetour(idDemandeConge){

    var id = 0;
    id = idDemandeConge;
    $("#modal_retourconge").modal('show');
    $('#fiche_conge_retourconge').val(id);

}

function show_modal(type, donnees=null) {

    setTimeout(function ()
    {
        // On fait d'abord un destroy
        if (!$('select').data('select2')) {
            $('.select').select2('destroy');
        }

        $('.select2').select2();
    },100);

    emptyform(type);

/*     if (type.indexOf('profil')!==-1)
    {
        $("[id^=permission_role]").each(function (key,value)
        {
            $(this).prop('checked', false);
        });
        $('#permission_all_role').prop('checked', false);
    }
 */
    if (type.indexOf('conge')!==-1 && type.indexOf('liste_conges')!==0){

        console.log(type.indexOf('liste_conges')!==-1, type.indexOf('conge')!==-1);
        $('#telephone_conge').val(donnees.telephone);
        $('#adresse_conge').val(donnees.adresse);
    }
    else if (type.indexOf('agent')!==-1){

        $('#agent').prop('checked', false);         
        $('#bureau_chef').prop('checked', false);              
        $('#division_chef').prop('checked', false);              
        $('#directeur').prop('checked', false);              
     
    }

    $("#modal_"+type).modal('show');
 }

function formatDate(str){
    date = str.split(' ');
    partDate = date[0];    partTime = date[1];
    console.log('date', partDate );
    datePart = partDate.split('-');
    return datePart[2]+"/"+datePart[1]+"/"+datePart[0]+" "+ partTime;
}


function transDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


function showCircuit(type,idAgent,idItem) {
    var circuitTab = [];
    $.ajax({
        type: "GET",
        url: SITE_URL + type + '/circuit/' +idAgent + '/' +idItem,
        dataType: "json",
        success: function (res) {
            circuitTab = res.data;
            console.log('tableau circuit', circuitTab);
            var inHTML = "";
            if(circuitTab.length != 0){
                $.each(circuitTab, function(index, value){
                    var date_reception = value["date_reception"];
                    var date_validation = value["date_validation"];
                    if(date_reception != 'En attente'){
                        date_reception = formatDate(date_reception);
                    }
                    if(date_validation != 'En attente'){
                        date_validation = formatDate(date_validation);
                    }
    
                    var newItem = '<tr><th scope="row">'+value["superieur"]+'</th><td>'+date_reception+'</td><td>'+date_validation+'</td><td>'+value["action"]+'</td></tr>';
                    inHTML += newItem;  
                });
            }
            else{
                console.log('Je suis vide!');
            }

            $("table#circuit_table > tbody").html(inHTML);

           $("#modal_circuit").modal('show');

        },
        error: function (res) {
           console.log('Error:', res.error);
        }
     })


 }


 function isFerie(date) {
     var jours_f = [];
     var resultat = false;
     $.ajax({
        type: "GET",
        url: SITE_URL + 'ferie/get_all',
        dataType: "json",
        async:false,
        success: function (res) {
            var result = res.data;
            if(result.length != 0){
                $.each(result, function(index, value){
                    jours_f.push(value.date);
                });
            }

            console.log(date, jours_f);
            console.log('est férié', jours_f.includes(date));
            resultat = jours_f.includes(date);
        },
        error: function (res) {
           console.log('Error:', res.error);
        }
     });
     return resultat;
 }


 function showInfos(type,idItem) {
    var historiqueTab = [];
    $.ajax({
        type: "GET",
        url: SITE_URL + type + '/details/' + idItem,
        dataType: "json",
        success: function (res) {
            historiqueTab = res.data;
            var inHTML = "";
            if(historiqueTab.length != 0){
                $.each(historiqueTab, function(index, value){
                    var date_reception = formatDate(value.date_reception);
                    var date_action = formatDate(value.date_action);
                    var action = '';
                    var color = '';
                    if(value.action == 0){
                        action = 'rejetée';
                        color = 'danger';
                    }else{
                        action = 'validée';
                        color = 'success';
                    }
    
    
                    var newItem = '<div class="vertical-timeline-item vertical-timeline-element"><div><span class="vertical-timeline-element-icon bounce-in"><i class="badge badge-dot badge-dot-xl badge-secondary"> </i></span><div class="vertical-timeline-element-content bounce-in"><h5 class="timeline-title"><span class="badge badge-'+color+' ml-2">'+action+'</span> le '+date_action+'</h5><p>date reception:  <span class="text-info">'+date_reception+'</span></p><p>Validateur:  <span class="text-info">'+value.nom_validateur+'</span></p><p>Commentaire:  <span class="text-info">'+value.commentaire+'</span></p><span class="vertical-timeline-element-date"></span></div></div></div>'
                    inHTML += newItem;  
                });
            }
            else{
                console.log('je suis ici');

                    var newItem = '<div class="vertical-timeline-item vertical-timeline-element"><div><span class="vertical-timeline-element-icon bounce-in"><i class="badge badge-dot badge-dot-xl badge-secondary"> </i></span><div class="vertical-timeline-element-content bounce-in"><h5 class="timeline-title">Aucune action !</h5><span class="vertical-timeline-element-date"></span></div></div></div>'
                inHTML = newItem;  
            }

            $("div#historique").html(inHTML);

           $("#modal_info").modal('show');

        },
        error: function (res) {
           console.log('Error:', res.error);
        }
     })


 }


function validate_all_plannings(tout){
	$("#modal_valide_all_planning").modal('show');
	all_plans = [];
	$.each(tout, function (key, value) {
		all_plans.push(value);
	});

	//console.log(all_plans);
}


function valide_plannings(){
	tab_all_plans = [];
	tab_all_plans = all_plans;
	$.each(tab_all_plans, function (key, value) {

		console.log(value.next);

		$.ajax({
			type: 'POST',
			url: SITE_URL + 'planning/validation/' + value.id + '/' + value.next + '/' + value.statut,
			//data:form.serialize(),
			dataType: 'json',

			success: function () {
				console.log('Je suis ici');
				return false;
			},
			error: function (value) {
				console.log('Error:', value);
			}
		})
	});

	setTimeout(function ()
	{
		$("#modal_valide_all_planning").modal('hide');
		location.reload();
	},1000);

}


 function showModalValidationPlan(type, niveau, statut,objId= null, title = null, location = null)
 {
    var id = 0;
    id = objId;
    var niveau = niveau;
    var statut = statut;
    var type = type;
    var title = title;
    var location = location;

    $("#modal_addchvalidplan").modal('show');
    
     $("#title_planning").text(title);
     $('#id_item_planning').val(id);
     $('#niveau_item_planning').val(niveau);
     $('#statut_item_planning').val(statut);
     $('#location_item_planning').val(location);
     console.log('parametres',type, niveau, statut,title,location);
 };



 function voirjustif(motif = null)
 {
    var motif = motif;

    $("#modal_voirjustif").modal('show');
    
     $("#text_justificatif").text(motif);
     console.log('parametres',motif);
 };



 function showModalValidation(type, niveau, statut,objId= null, title = null, location = null)
 {
    var id = 0;
    id = objId;
    var niveau = niveau;
    var statut = statut;
    var type = type;
    var title = title;
    var location = location;

    $("#modal_addchvalid").modal('show');
    
     $("#title").text(title);
     $('#id_item_niveau').val(id);
     $('#niveau_item_niveau').val(niveau);
     $('#statut_item_niveau').val(statut);
     $('#location_item_niveau').val(location);
     console.log('parametres',type, niveau, statut,title,location);
 };

 
 function showModalValidationRetour(type, niveau, statut,objId= null, title = null, location = null)
 {
    var id = 0;
    id = objId;
    var niveau = niveau;
    var statut = statut;
    var type = type;
    var title = title;
    var location = location;

    $("#modal_addchvalidretour").modal('show');
    
     $("#title_retour").text(title);
     $('#id_item_retour').val(id);
     $('#niveau_item_retour').val(niveau);
     $('#statut_item_retour').val(statut);
     $('#location_item_retour').val(location);
     console.log('parametres',type, niveau, statut,title,location);
 };


 function updateElement(type, itemId) {
 
        var this_id = itemId;

        console.log(this_id);

        $.ajax({
           type: "POST",
           url: SITE_URL + type + '/get_'+ type +'_by_id/' +itemId,
           data: {
              id: this_id
           },
           dataType: "json",
           success: function (res) {
              if (res.success == true) {
                 emptyform(type);
                 $("#modal_"+type).modal('show');

                if (type.indexOf('retourconge')!==-1){

                    $('#id_retourconge').val(res.data.id);
                    $('#motif_retourconge').val(res.data.motif);
                    $('#date_retour_retourconge').val(res.data.date_retour);
                    $('#fiche_conge_retourconge').val(res.data.fiche_conge_id);
                }
                else if (type.indexOf('conge')!==-1){

                    $('#id_conge').val(res.data.id);
                    $('#type_conge_conge').val(res.data.type_conge_id).trigger('change');
                    $('#motif_conge').val(res.data.motif);
                    $('#date_debut_conge').val(res.data.date_debut).trigger('change');
                    $('#nombre_jour_conge').val(res.data.nombre_jour).trigger('change');
                    $('#telephone_conge').val(res.data.telephone);
                    $('#adresse_conge').val(res.data.adresse);
                }
                else if (type.indexOf('agent')!==-1){

                    $('#id_agent').val(res.data.id);
                    $('#nom_agent').val(res.data.nom);
                    $('#prenom_agent').val(res.data.prenom);
                    $('#telephone_agent').val(res.data.telephone);
                    $('#adresse_agent').val(res.data.adresse);
                    $('#poste_telephonique_agent').val(res.data.poste_telephonique);
                    $('#date_naissance_agent').val(res.data.date_naissance);
                    $('#date_embauche_agent').val(res.data.date_embauche);
                    $('#matricule_agent').val(res.data.matricule);
                    $('#grade_agent').val(res.data.grade);
                    $('#typeagent_agent').val(res.data.type_agent_id);
                    $('#fonction_agent').val(res.data.fonction_id);
                    $('#cellule_agent').val(res.data.id_cellule);
                    $('#direction_agent').val(res.data.direction_id);
                    $('#division_agent').val(res.data.id_divison);
                    $('#bureau_agent').val(res.data.id_bureau);
                    $('#username_agent').val(res.user.prenom);
                    $('#email_agent').val(res.user.email);
                    if(res.role != null){
                        $('#profil_agent').val(res.role.role_id);
                    }

                    var his_niveau = res.data.niveau;
                    //console.log(his_niveau);
                    if(his_niveau == '0'){
                        $('#agent').prop('checked', true);              
                    }
                    else if(his_niveau == '1'){
                        $('#bureau_chef').prop('checked', true);              
                    }
                    else if(his_niveau == '2'){
                        $('#division_chef').prop('checked', true);              
                    }
                    else if(his_niveau == '3' && res.data.direction_id != ''){
                        $('#directeur').prop('checked', true);              
                    }
                    else if(his_niveau == '3' && res.data.id_cellule != ''){
                        $('#cellule_chef').prop('checked', true);              
                    }
                    else if(his_niveau == '3'){
                        $('#dg_adjoint').prop('checked', true);              
                    }
                    else if(his_niveau == '4'){
                        $('#dg').prop('checked', true);              
                    }
                }
                else if (type.indexOf('planning')!==-1){

                    $('#id_planning').val(res.data.id);
                    $('#annee_planning').val(res.data.annee);
                    $('#date_debut_planning').val(res.data.date_debut).trigger('change');
                    $('#date_fin_planning').val(res.data.date_fin);
                }
                else if (type.indexOf('utilisateur')!==-1){

                    $('#id_utilisateur').val(res.data.id);
                    $('#username_utilisateur').val(res.data.prenom);
                    $('#email_utilisateur').val(res.data.email);
                    $('#profil_utilisateur').val(res.role.role_id);              
                }
                else if (type.indexOf('profil')!==-1){

                    $('#id_profil').val(res.data.id);
                    $('#nom_profil').val(res.data.name);
                    $('#description_profil').val(res.data.description);

                    role_permissions = [];
                    $.each(res.perm, function (key, value) {
                        role_permissions.push(value.permission_id);
                    });

                    data = role_permissions;
                    console.log(res.data,data);
                    $("[id^=permission_role]").each(function (key,value)
                    {
                        var this_permission = $(this).attr('data-permission-id');
                        $('#permission_role_'+this_permission).prop('checked', false);

                        $.each(data, function (key, value) {
                            if (value == this_permission)
                            {
                                $('#permission_role_'+this_permission).prop('checked', true);
                            }
                        });
                    });
                }
                else if (type.indexOf('pointage')!==-1){

                    $('#id_pointage').val(res.data.id);
                    $('#type_pointage').val(res.data.type_entree_sortie_id);
                    $('#agent_pointage').val(res.data.agent_id);
                }
                else if (type.indexOf('justificatif')!==-1){

                    $('#id_justificatif').val(res.data.id);
                    $("#agent_justificatif").val(res.data.agent_id);
                    $('#type_presence_justificatif').val(res.data.type_entree_sortie_id);
                    $('#date_jour_justificatif').val(res.data.date_jour);
                    $('#motif_non_pointage_justificatif').val(res.data.motif_non_pointage);
                }
                else if (type.indexOf('typecong')!==-1){

                    $('#id_typecong').val(res.data.id);
                    $('#nom_typecong').val(res.data.nom);
                    $('#description_typecong').val(res.data.description);
                    $('#nb_jour_annuel_typecong').val(res.data.nb_jour_annuel);
                }
                else if (type.indexOf('typeagent')!==-1){

                    $('#id_typeagent').val(res.data.id);
                    $('#nom_typeagent').val(res.data.nom);
                }
                else if (type.indexOf('fonction')!==-1){

                    $('#id_fonction').val(res.data.id);
                    $('#nom_fonction').val(res.data.nom);
                }
                else if (type.indexOf('ferie')!==-1){

                    $('#id_ferie').val(res.data.id);
                    $('#date_ferie').val(res.data.date);
                    $('#libelle_ferie').val(res.data.libelle);
                }
                else if (type.indexOf('direction')!==-1){

                    $('#id_direction').val(res.data.id);
                    if(res.data.id==1){
                        $('#nom_direction').attr('readonly', true);
                    }
                    else{
                        $('#nom_direction').attr('readonly', false);
                    }
                    $('#nom_direction').val(res.data.nom);
                    $('#directeur_direction').val(res.data.directeur_id);
                }
                else if (type.indexOf('cellule')!==-1){

                    $('#id_cellule').val(res.data.id);
                    $('#id_cellule').val(res.data.nom);
                    $('#chef_cellule').val(res.data.chef_id);
                }
                else if (type.indexOf('division')!==-1){

                    $('#id').val(res.data.id);
                    $('#nom_division').val(res.data.nom);
                    $('#chef_division').val(res.data.chef_id);
                    $('#direction_division').val(res.data.direction_id);
                }
                else if (type.indexOf('bureau')!==-1){

                    $('#id_bureau').val(res.data.id);
                    $('#nom_bureau').val(res.data.nom);
                    $('#chef_bureau').val(res.data.chef_id);
                    $('#division_bureau').val(res.data.id_divison);
                }
              }
           },
           error: function (data) {
              console.log('Error:', data);
           }
        }); }

 function deleteElement(type,itemId){
    var msg = '<p class="">VOULEZ-VOUS VRAIMENT SUPPRIMER ?</p>';
    var title = 'SUPPRESSION';
    iziToast.question({
        timeout: 0,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: title,
        message: msg,
        color: '#96e1f2',
        position: 'center',
        buttons: [
            ['<button class="font-bold">OUI</button>', function (instance, toast) {
                var my_id = itemId;

                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                $.ajax({
                    type: "POST",
                    url: SITE_URL + type + '/delete/' + itemId,
                    data: {
                        my_id: my_id
                    },
                    dataType: "json",
                    success: function (data) {
                       $("#"+ type +"_id_" + my_id).remove();
                    },
                    error: function (data) {
                       console.log('Error:', data);
                    }
                 })

            }, true],
            ['<button>NON</button>', function (instance, toast) {

                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

            }],
        ],
        onClosing: function(instance, toast, closedBy){
            console.log('Closing | closedBy: ' + closedBy);
        },
        onClosed: function(instance, toast, closedBy){
            console.log('Closed | closedBy: ' + closedBy);
        }
    });

 }

function changeNiveau(type) {
    if (type.indexOf('retourconge')!==-1){
        var form = $('#form_addchvalidretour');
    }
    else if(type.indexOf('conge')!==-1){
        var form = $('#form_addchvalid');
    }
    else if(type.indexOf('planning')!==-1){
        var form = $('#form_addchvalidplan');
    }
    send_data = form.serializeObject();
    console.log(send_data);
    form.parent().parent().blockUI_start();

    $.ajax({
        type: 'POST',
        url: SITE_URL + type+'/validation/' + send_data.id + '/' + send_data.niveau_validation + '/' + send_data.statut_validation,
        data:form.serialize(),
        dataType: 'json',

        success: function (res) {
            console.log('je suis la');

            if (type.indexOf('retourconge')!==-1){
                $("#modal_addchvalidretour").modal('hide');
            }
            else if (type.indexOf('conge')!==-1){
                $("#modal_addchvalid").modal('hide');
            }
            else if (type.indexOf('planning')!==-1){
                $("#modal_addchvalidplan").modal('hide');
            }
            location.reload();
        return false;
        },
        error: function (data) {
            console.log('Error:', data);
         }

    })
}

function changeStatut(type) {
    var form = $('#form_addchvalidplan');
    var send_data = form.serializeObject();
    console.log(send_data);
    form.parent().parent().blockUI_start();

    $.ajax({
        type: 'POST',
        url: SITE_URL + type+'/validation/' + send_data.id_plan + '/' + send_data.statut_plan,
        data:form.serialize(),
        dataType: 'json',

        success: function (res) {
            console.log('je suis la');

            $("#form_addchvalidplan").modal('hide');
            location.reload();
        return false;
        },
        error: function (data) {
            console.log('Error:', data);
         }

    })
}


function change(type, planning_valide){
    if (type.indexOf('type_conge')!==-1){
        var element = $('#type_conge_conge').val();
        console.log('elements', type, element, planning_valide);
        if(element === '1'){
            if(planning_valide != 'null'){
                var datedebut = new Date(planning_valide);
                var datefin = datedebut.setDate(datedebut.getDate() + 1);
                         datefin = new Date(datefin);
                         //console.log('test', isFerie(transDate(datefin))) ;

                        while (datefin.getDay() == 0 || datefin.getDay() == 6 || isFerie(transDate(datefin) )) {
                            datefin = new Date(datefin.setDate(datefin.getDate() + 1 ));
                        };
                        var nonweekenddays = 1;

                        while (nonweekenddays < 29) {
                             datefin = new Date(datefin.setDate(datefin.getDate() + 1));
                            if(datefin.getDay() != 0 && datefin.getDay() != 6 && !isFerie(transDate(datefin) )){
                                //console.log(day.getDay());
                                nonweekenddays++;
                            }
                        };
  
                        month = '' + (datefin.getMonth() + 1),
                        day = '' + datefin.getDate(),
                        year = datefin.getFullYear();
    
                        if (month.length < 2) 
                            month = '0' + month;
                        if (day.length < 2) 
                            day = '0' + day;
    
                datefin = [year, month, day].join('-');
                    
                $('#date_debut_conge').val(planning_valide).attr('readonly', true);
                $('#date_fin_conge').val(datefin).attr('readonly', true);
                $('#nombre_jour_conge').val(30).attr('readonly', true);
                $("#motif_div").hide();
            }
            else{
                $("#type_conge_conge").val("");
                iziToast.error({
                    title: "",
                    message: '<span class="h4">Vous n\'avez aucun planning valide pour l\'année en cours! </span>',
                    position: 'topRight'
                });
            }
        }
        else{
            $('#date_debut_conge').val("").attr('readonly', false);
            $('#date_fin_conge').val("");
            $('#nombre_jour_conge').val("").attr('readonly', false);
            $("#motif_div").show();
        }
    }
    else if(type.indexOf('debut_planning')!==-1){
        var element = $('#date_debut_planning').val();
        if(element != ''){
            var datedebut = new Date(element);
            var datefin = datedebut.setDate(datedebut.getDate() + 1);
            datefin = new Date(datefin);
           while (datefin.getDay() == 0 || datefin.getDay() == 6 || isFerie(transDate(datefin) )) {
               datefin = new Date(datefin.setDate(datefin.getDate() + 1 ));
           };
           var nonweekenddays = 1;

           while (nonweekenddays < 29) {
                datefin = new Date(datefin.setDate(datefin.getDate() + 1));
               if(datefin.getDay() != 0 && datefin.getDay() != 6 && !isFerie(transDate(datefin) )){
                   //console.log(day.getDay());
                   nonweekenddays++;
               }
           };

                    month = '' + (datefin.getMonth() + 1),
                    day = '' + datefin.getDate(),
                    year = datefin.getFullYear();

                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;

            datefin = [year, month, day].join('-');
            console.log('données:', element, datefin);

            $('#date_fin_planning').val(datefin).attr('readonly', true);
        }
        else{
            $('#date_fin_planning').val('');
        }
    }
    else if(type.indexOf('debut_conge')!==-1){
        var debut = $('#date_debut_conge').val();
        var duree = $('#nombre_jour_conge').val();
        if(debut != '' && duree != '' ){
            var datedebut = new Date(debut);
            var datefin = datedebut.setDate(datedebut.getDate() + 1 );
                    datefin = new Date(datefin);
                    //console.log(datedebut);
                    while (datefin.getDay() == 0 || datefin.getDay() == 6 || isFerie(transDate(datefin) )) {
                        datefin = new Date(datefin.setDate(datefin.getDate() + 1 ));
                    };
                    var nonweekenddays = 1;

                    while (nonweekenddays < (parseInt(duree)-1)) {
                         datefin = new Date(datefin.setDate(datefin.getDate() + 1));
                        if(datefin.getDay() != 0 && datefin.getDay() != 6 && !isFerie(transDate(datefin) )){
                            //console.log(day.getDay());
                            nonweekenddays++;
                        }
                    };

                    month = '' + (datefin.getMonth() + 1),
                    day = '' + datefin.getDate(),
                    year = datefin.getFullYear();

                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;

            datefin = [year, month, day].join('-');
            console.log('données:', debut, datefin);

            $('#date_fin_conge').val(datefin).attr('readonly', true);
        }
        else{
            $('#date_fin_conge').val('');
        }
    }


}


 function addElement(type) {
   
        console.log('je suis ici');

        var myForm = $('#form_' + type);

        var formdata=(window.FormData) ? ( new FormData(myForm[0])): null;
        var send_data=(formdata!==null) ? formdata : myForm.serialize();

        send_dataObj = myForm.serializeObject();
        continuer = true;

        if (type.indexOf('profil')!==-1)
        {
            send_data.append("permissions", role_permissions);
            console.log('role_permissions', role_permissions, '...', send_data.get('permissions') );
            if (role_permissions.length==0)
            {
                iziToast.error({
                    title: "",
                    message: "Vous devez ajouter au moins une permission",
                    position: 'topRight'
                });
                continuer = false;
            }
        }

        if (myForm.validate() && continuer) {
            myForm.parent().parent().blockUI_start();

               $.ajax({
                  url: SITE_URL + type + '/store',
                  type: "POST",
                  contentType:false,
                  processData:false,
                  DataType:'text',
                  dataType: 'json',
                  data: send_data,
                  success: function (res) {
                        console.log('je suis la');
/*                     if (type.indexOf('conge')!==-1){
                        var conge = '<tr id="conge_id_' + res.data.id + '"><td><span>' + res.data.created_at +'</span></td><td><span>' + res.data.date_debut +'</span></td><td><span>' + res.data.nombre_jour +'</span></td><td><div class="mb-2 mr-2 badge badge-pill badge-secondary">En attente</div></td><td><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-danger" onclick="deleteElement(\'conge\','+ res.data.id +')" title="Supprimer cette demande"><i class="fa fa-trash"></i></button><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-primary" onclick="updateElement(\'conge\','+ res.data.id +')" title="modifier les infos"><span class="fa fa-edit"></span></button><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-sm btn-success" title="Envoyer pour validation" onclick="showModalValidation(\'conge\', 1,' + res.data.id +', \'Envoyer pour validation\')"><i class="fa fa-thumbs-up"></i></button></td></tr>'
                        if (!send_dataObj.id) {
                            $('#conge_list').prepend(conge);
                        } else {
                            $("#conge_id_" + res.data.id).replaceWith(conge);
                        }
                    }
                    else if (type.indexOf('planning')!==-1){
                        var planning = '<tr id="planning_id_' + res.data.id + '"><td><span>' + res.data.annee +'</span></td><td><span>' + res.data.date_debut +'</span></td><td><span>' + res.data.date_fin +'</span></td><td><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-danger" onclick="deleteElement(\'planning\','+ res.data.id +')" title="Supprimer ce planning"><i class="fa fa-trash"></i></button><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-primary" onclick="updateElement(\'planning\','+ res.data.id +')" title="modifier les infos"><span class="fa fa-edit"></span></button></td></tr>'
                        if (!send_dataObj.id) {
                            $('#planning_list').prepend(planning);
                        } else {
                            $("#planning_id_" + res.data.id).replaceWith(planning);
                        }
                    }
                    else if (type.indexOf('direction')!==-1){
                        var direction = '<tr id="direction_id_' + res.data.id + '"><td><span>' + res.data.nom +'</span></td><td><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-danger" onclick="deleteElement(\'direction\','+ res.data.id +')" title="Supprimer cette direction"><i class="fa fa-trash"></i></button><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-primary" onclick="updateElement(\'direction\','+ res.data.id +')" title="modifier les infos"><span class="fa fa-edit"></span></button></td></tr>'
                        if (!send_dataObj.id) {
                            $('#direction_list').prepend(direction);
                        } else {
                            $("#direction_id_" + res.data.id).replaceWith(direction);
                        }
                    }
                    else if (type.indexOf('cellule')!==-1){
                        var cellule = '<tr id="cellule_id_' + res.data.id + '"><td><span>' + res.data.nom +'</span></td><td><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-danger" onclick="deleteElement(\'cellule\','+ res.data.id +')" title="Supprimer cette cellule"><i class="fa fa-trash"></i></button><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-primary" onclick="updateElement(\'cellule\','+ res.data.id +')" title="modifier les infos"><span class="fa fa-edit"></span></button></td></tr>'
                        if (!send_dataObj.id) {
                            $('#cellule_list').prepend(cellule);
                        } else {
                            $("#cellule_id_" + res.data.id).replaceWith(cellule);
                        }
                    }
                    else if (type.indexOf('typecong')!==-1){
                        var typecong = '<tr id="typecong_id_' + res.data.id + '"><td><span>' + res.data.nom +'</span></td><td><span>' + res.data.nb_jour_annuel +'</span></td><td><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-danger" onclick="deleteElement(\'typecong\','+ res.data.id +')" title="Supprimer ce type"><i class="fa fa-trash"></i></button><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-primary" onclick="updateElement(\'typecong\','+ res.data.id +')" title="modifier les infos"><span class="fa fa-edit"></span></button></td></tr>'
                        if (!send_dataObj.id) {
                            $('#typecong_list').prepend(typecong);
                        } else {
                            $("#typecong_id_" + res.data.id).replaceWith(typecong);
                        }
                    }
                    else if (type.indexOf('division')!==-1){
                        var division = '<tr id="division_id_' + res.data.id + '"><td><span>' + res.data.nom +'</span></td><td><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-danger" onclick="deleteElement(\'division\','+ res.data.id +')" title="Supprimer cette division"><i class="fa fa-trash"></i></button><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-primary" onclick="updateElement(\'division\','+ res.data.id +')" title="modifier les infos"><span class="fa fa-edit"></span></button></td></tr>'
                        if (!send_dataObj.id) {
                            $('#division_list').prepend(division);
                        } else {
                            $("#division_id_" + res.data.id).replaceWith(division);
                        }
                    }
                    else if (type.indexOf('bureau')!==-1){
                        var bureau = '<tr id="bureau_id_' + res.data.id + '"><td><span>' + res.data.nom +'</span></td><td><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-danger" onclick="deleteElement(\'bureau\','+ res.data.id +')" title="Supprimer ce bureau"><i class="fa fa-trash"></i></button><button type="button" class="mb-2 mr-2 btn-icon btn-icon-only btn-pill btn btn-primary" onclick="updateElement(\'bureau\','+ res.data.id +')" title="modifier les infos"><span class="fa fa-edit"></span></button></td></tr>'
                        if (!send_dataObj.id) {
                            $('#bureau_list').prepend(bureau);
                        } else {
                            $("#bureau_id_" + res.data.id).replaceWith(bureau);
                        }
                    }

 */                     
                        myForm.parent().parent().blockUI_stop();
                        if (res.data!=null && !res.errors)
                        {

                        console.log('je suis la !')
                        iziToast.success({
                            title: (!send_dataObj.id ? 'AJOUT' : 'MODIFICATION'),
                            message: "réussite",
                            position: 'topRight'
                        });

                            $('#form_' + type).trigger("reset");
                            $('#modal_'+type).modal('hide');
                            location.reload();

                        }else{
                        iziToast.error({
                            title: "",
                            message: '<span class="h4">' + res.errors + '</span>',
                            position: 'topRight'
                        });
                        }

                    },
                  error: function (error) {
                     console.log('Erreur serveur:', error);
                     iziToast.error({
                        title: "",
                        message: '<span class="h4">' + msg_erreur + '</span>',
                        position: 'topRight'
                    });
              }
         });


        }
}


function addToRole(itemId)
      {
          var all_checked = true;
          role_permissions = [];
          $("[id^=permission_role]").each(function (key,value)
          {
              if ($(this).prop('checked'))
              {
                  var permission_id = $(this).attr('data-permission-id');
                  role_permissions.push(permission_id);
              }
              else
              {
                  all_checked = false;
              }
          });
          $('#permission_all_role').prop('checked', all_checked);
          console.log('arrive', all_checked, role_permissions);
      }
  

      function checkAllOruncheckAll(){
        var cocherOuNon = $('#permission_all_role').is(":checked");
        console.log(cocherOuNon);
        if (cocherOuNon == true)
        {
            //Tout doit etre coché
            $("#labelCocherTout").html('Tout décocher');
        }
        else
        {
            //Tout doit etre décoché
            $("#labelCocherTout").html('Tout cocher');
        }
        $('.mycheckbox').prop('checked', cocherOuNon);

        addToRole();

    }


    function emptyform(type)
    {
        let dfd = $.Deferred();
        $('.ws-number').val("");
        $("input[id$=" + type + "], textarea[id$=" + type + "], select[id$=" + type + "], button[id$=" + type + "]").each(function ()
        {
            $(this).val("");
            //$(this).attr($(this).hasClass('btn') ? 'disabled' : 'readonly', false);
        });

        $('#img' + type)
            .val("");
        $('#affimg' + type).attr('src',imgupload);

        return dfd.promise();
    }


    function justifierAbscence(type, date, agent){
        var type_justif = 1;
        if(type.indexOf('arrivee')!==-1){
            type_justif = 1;
        }
        else if(type.indexOf('depart')!==-1){
            type_justif = 2;
        }

        var type_entree_sortie = type_justif;
        var date_jour = date;
        var agent_justificatif = agent;

        $("#modal_justificatif").modal('show');
        
        $("#agent_justificatif").val(agent_justificatif);
        $('#type_presence_justificatif').val(type_entree_sortie);
        $('#date_jour_justificatif').val(date_jour);
        
        console.log('parametres',type_justif, date_jour, agent);
    }


    function addListeElements(type) {
   
        console.log('je suis ici');

        var myForm = $('#form_liste_' + type + 's');

        var formdata=(window.FormData) ? ( new FormData(myForm[0])): null;
        var send_data=(formdata!==null) ? formdata : myForm.serialize();

        send_dataObj = myForm.serializeObject();
        console.log('afficher fichier !',myForm, send_dataObj, send_data);
        continuer = true;

        if (myForm.validate() && continuer) {
            myForm.parent().parent().blockUI_start();

               $.ajax({
                  url: SITE_URL + type + '/importerListe',
                  type: "POST",
                  contentType:false,
                  processData:false,
                  DataType:'text',
                  dataType: 'json',
                  data: send_data,
                  success: function (res) {
                        console.log('je suis la');
                        myForm.parent().parent().blockUI_stop();
                        if (res.data!=null && !res.errors)
                        {

                        console.log('je suis la !')
                        iziToast.success({
                            title: (!send_dataObj.id ? 'AJOUT' : 'MODIFICATION'),
                            message: "réussite",
                            position: 'topRight'
                        });

                            $('#form_liste_' + type + 's').trigger("reset");
                            $('#modal_liste'+type+'s').modal('hide');
                            location.reload();

                        }else{
                        iziToast.error({
                            title: "",
                            message: '<span class="h4">' + res.errors + '</span>',
                            position: 'topRight'
                        });
                        }

                    },
                  error: function (error) {
                     console.log('Erreur serveur:', error);
                     iziToast.error({
                        title: "",
                        message: '<span class="h4">' + msg_erreur + '</span>',
                        position: 'topRight'
                    });
              }
         });


        }
}
