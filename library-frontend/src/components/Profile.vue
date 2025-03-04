<template>
 
<!-- Nút mở Modal -->
<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal">
    View Profile
</button> -->

<!-- Modal -->
<div class="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="profileModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="profileModalLabel">User Profile</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container emp-profile">
                    <form method="post">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="profile-img text-center">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" class="img-fluid rounded-circle" alt=""/>
                                    <div class="mt-3">
                                        <label class="btn btn-primary btn-sm">
                                            Change Photo <input type="file" name="file" hidden/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="profile-head">
                                    <h5>Kshiti Ghelani</h5>
                                    <h6>Web Developer and Designer</h6>
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab">About</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-content profile-tab mt-3" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel">
                                        <div class="row">
                                            <div class="col-md-6"><label>User Id</label></div>
                                            <div class="col-md-6"><p>Kshiti123</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label>Name</label></div>
                                            <div class="col-md-6"><p>Kshiti Ghelani</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label>Email</label></div>
                                            <div class="col-md-6"><p>kshitighelani@gmail.com</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label>Phone</label></div>
                                            <div class="col-md-6"><p>123 456 7890</p></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label>Profession</label></div>
                                            <div class="col-md-6"><p>Web Developer and Designer</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>           
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Edit Profile</button>
            </div>
        </div>
    </div>
</div>

<!-- Button to trigger modal -->
<!-- <button id="profileModalButton" data-bs-toggle="modal" data-bs-target="#profileModal">Open Profile</button> -->
</template>

<style scoped>
@import "@/assets/profile.css";
</style>