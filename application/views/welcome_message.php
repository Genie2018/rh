<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Direction des ressources humaines</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no"/>

    <!-- Disable tap highlight on IE -->
    <meta name="msapplication-tap-highlight" content="no">

	<link rel="stylesheet" href="<?php echo base_url(); ?>ressources/css/base.min.css?v=1.0">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>ressources/css/style.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>ressources/css/flag-icon.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>ressources/css/colors/style.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>ressources/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>ressources/css/select2.min.css">

    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>ressources/css/daterangepicker.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>ressources/css/pickadate.css">

    <style>
        .datepicker-container{
            z-index: 9999 !important;
        }
    </style>
</head>
<body>
<div class="app-container app-theme-white body-tabs-shadow closed-sidebar-mobile closed-sidebar">
	<div class="app-container closed-sidebar-mobile closed-sidebar">
		<div class="h-100">
			<div class="h-100 no-gutters row">
			<div class=" d-xs-none col-lg-6">
					<div class="slider-light">
						<div class="slick-slider slick-initialized">
							<div>
								<div class="position-relative h-75 d-flex justify-content-center align-items-center bg-premium-dark" tabindex="-1">
									<div class="slide-img-bg" style="background-image: url('<?php echo base_url(); ?>ressources/css/samtv1.jpg');"></div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-6">
                        <div class="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
									<div class="slider-content">
						<h6 style="color: green;">Direction des ressources humaines Sénégal Action Média</h6>
										<p></p>
									</div>
                            <div class="app-logo"></div>
							<h4 class="text-center">
								<img class="animated zoomIn" src="<?php echo base_url(); ?>ressources/css/samtv.jpg" style="width: 30%;" id="icon" alt="Icon" />
							</h4>
                            <div class="divider row">
							
							</div>
                            <div>
                                
								<?= form_open('connexion', ['class' => 'form-horizontal']); ?>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="position-relative form-group <?= empty(form_error('username')) ? "" : "has-error" ?>"><label for="exampleEmail" class="btn btn-success">Email</label>
											<?= form_input(['name' => "username", 'id' => "username", 'class' => 'form-control'], set_value('username')) ?>
						<span class="help-block"><?= form_error('username'); ?></span>
											</div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="position-relative form-group <?= empty(form_error('password')) ? "" : "has-error" ?>"><label for="examplePassword" class="btn btn-success">Password</label>
											<?= form_password(['name' => "password", 'id' => "password", 'class' => 'form-control'], set_value('password')) ?>
											<span class="help-block"><?= form_error('password'); ?></span>
											</div>
                                        </div>
                                    </div> 
                                    
                                    <div class="divider row"></div>
                                    <div class="d-flex align-items-center">
                                        <div class="ml-auto">
										<?= form_submit("send", "Se connecter", ['class' => "btn btn-success"]); ?>
                                        </div>
                                    </div>
									<div class="row">
    				<?= form_open('connexion', ['class' => 'form-horizontal']); ?>
    					<?php if(! empty( $login_error)) : ?>
      							<div class="form-group">
        					<div class="col-md-offset-2 col-md-10 has-error btn btn-success">
          						<span class="help-block"><?= $login_error; ?></span>
       						</div>
      						</div>
      <!-- (...) -->
    					<?php endif; ?>
    					<?= form_close() ?>
							</div>
                                
                            </div>
                        </div>
            	</div>
			</div>
		</div>
	</div>
</div>
</body>
