
route('/', 'index', function () {
    $.get(baseUrl + 'home', function (data) {
        this.dashboardDatas = data;

        ko.cleanNode(document.getElementById("view"));
        ko.applyBindings(this.dashboardDatas, document.getElementById("view"));
    });

});

route('/Deployments', 'deployment', function () {
    $.get(baseUrl + 'DeploymentSheet?deploymentDate=' + $("#txtDeploymentDate").val(), function (data) {
        ko.cleanNode(document.getElementById("view"));
        ko.applyBindings(new DeploymentSheetModel(data), document.getElementById("view"));
    });

    var DeploymentSheetModel = function (item) {
        this.availableDriver = ko.observableArray(item.AvailableDriver);
        this.availableCrew = ko.observableArray(item.AvailableCrew);
        this.availableWorker = ko.observableArray(item.AvailableWorker);
        this.deploymentSheet = ko.observableArray(item.DeploymentSheet);
    }.bind(this);

});
route('/person', 'person', function () {
    this.heading = 'I\'m page two!';

    $.get(baseUrl + 'person', function (data) {
        this.persons = data;

        ko.cleanNode(document.getElementById("view"));
        ko.applyBindings(new PersonList(data), document.getElementById("view"));
    });
    var PersonList = function (items) {
        this.persons = ko.observableArray(items);
        this.Id = ko.observable("");
        this.Name = ko.observable("");
        this.Email = ko.observable("");
        this.Phone = ko.observable("");
        //  this.StaffType = ko.observable("");
        this.addPerson = function () {
            var newPerson = {
                Id: this.Id(),
                Name: this.Name(),
                Email: this.Email(),
                StaffType: 1,
                Phone: this.Phone(),

            }
            this.persons.push(newPerson);
            $.ajax({
                url: baseUrl + 'person',
                data: JSON.stringify(newPerson),
                contentType: 'application/json',
                method: 'POST',
                success: function () {
                    alert('record added successfully');
                }
            });
        }
        this.updatePerson = function (person) {
            alert(JSON.stringify(person));
            this.Id = ko.observable(person.Id);
            this.Name = ko.observable(person.Name);
            this.Email = ko.observable(person.Email);
            this.Phone = ko.observable(person.Phone);

        }
        this.removePerson = function (person) {
            this.persons.remove(person);
        }
            .bind(this);
    };



});

route('/vehicle', 'vehicle', function () {
    $.get(baseUrl + 'vehicle', function (data) {
        this.vehicles = data;

        ko.cleanNode(document.getElementById("view"));
        ko.applyBindings(new SimpleListModel(data), document.getElementById("view"));
    });

    var SimpleListModel = function (items) {
        this.vehicles = ko.observableArray(items);
        console.log(this.vehicles);

        this.VehicleNumber = ko.observable("");
        this.RegistrationYear = ko.observable("");
        this.ServiceProvider = ko.observable("");
        this.VehicleDetails = ko.observable("");

        this.addVehicle = function () {

            var newVehicle = {
                VehicleNumber: this.VehicleNumber(),
                VehicleDetails: this.VehicleDetails(),
                ServiceProvider: this.ServiceProvider(),
                RegistrationYear: this.RegistrationYear()
            }
            this.vehicles.push(newVehicle);
            this.VehicleNumber = ko.observable("");
            this.RegistrationYear = ko.observable("");
            this.ServiceProvider = ko.observable("");
            this.VehicleDetails = ko.observable("");
            $.ajax({
                url: baseUrl + 'vehicle',
                type: 'POST',
                data: JSON.stringify(newVehicle),
                contentType: 'application/json',
                success: function () {
                    alert('record added successfully');
                }
            })
        }
            .bind(this);
    };
});
route('/route', 'route', function () {
    $.get(baseUrl + 'route', function (data) {
        this.routes = data;

        ko.cleanNode(document.getElementById("view"));
        ko.applyBindings(new RouteModel(data), document.getElementById("view"));
    });
    var RouteModel = function (items) {
        this.routes = ko.observableArray(items);
        console.log(this.routes);

        this.CompactorNumber = ko.observable("");
        this.Size = ko.observable("");
        this.Make = ko.observable("");
        this.Location = ko.observable("");
        this.LocationId = ko.observable("");

        this.addCompactor = function () {
            var newCompactor = {
                CompactorNumber: this.CompactorNumber(),
                Size: this.Size(),
                Make: this.Make(),
                LocationId: this.LocationId()
            }
            this.compactors.push(newCompactor);

            this.CompactorNumber = ko.observable("");
            this.Size = ko.observable("");
            this.Make = ko.observable("");
            this.LocationId = ko.observable("");
            $.ajax({
                url: baseUrl + 'compactor',
                type: 'POST',
                data: JSON.stringify(newCompactor),
                contentType: 'application/json',
                success: function () {
                    alert('record added successfully');
                }
            })
        }
        this.removeCompactor = function (compactor) {
            this.compactors.remove(compactor);
        }
            .bind(this);
    };
});

route('/complain', 'complain', function () {
    $.get(baseUrl + 'complain', function (data) {
        this.complains = data.complaints;

        ko.cleanNode(document.getElementById("view"));
        ko.applyBindings(new ComplainListModel(data), document.getElementById("view"));
    });
    var ComplainListModel = function (items) {
        this.complains = ko.observableArray(items.complaints);
        this.locations = ko.observableArray(items.locations);
        this.compactors = ko.observableArray(items.compactors);

        this.Name = ko.observable("");
        this.Email = ko.observable("");
        this.ContactNumber = ko.observable("");
        this.Location = ko.observable("");
        this.Competor = ko.observable("");
        this.Description = ko.observable("");

        this.addComplain = function () {

            var newComplain = {

                //      this.complains.push({

                Name: this.Name(),

                Email: this.Email(),

                ContactNumber: this.ContactNumber(),

                Location: this.Location(),

                Compactor: this.Compactor(),

                Description: this.Description()

                //});
            };
            this.Name = ko.observable("");
                this.Email = ko.observable("");
                this.ContactNumber = ko.observable("");
                this.Location = ko.observable("");

                this.Compactor = ko.observable("");

                this.Description = ko.observable("");

                $.ajax({

                    url: baseUrl + 'complain',

                    type: 'POST',

                    data: JSON.stringify(newComplain),

                    contentType: 'application/json',

                    success: function () {

                        alert('record added successfully');

                    }

                })

            }

                .bind(this);
        };
    });
route('/compactor', 'compactor', function () {
    $.get(baseUrl + 'compactor', function (data) {
        this.compactors = data;

        ko.cleanNode(document.getElementById("view"));
        ko.applyBindings(new CompactorModel(data), document.getElementById("view"));
    });
    var CompactorModel = function (items) {
        this.compactors = ko.observableArray(items);
        console.log(this.compactors);

        this.CompactorNumber = ko.observable("");
        this.Size = ko.observable("");
        this.Make = ko.observable("");
        this.Location = ko.observable("");
        this.LocationId = ko.observable("");

        this.addCompactor = function () {
            var newCompactor = {
                CompactorNumber: this.CompactorNumber(),
                Size: this.Size(),
                Make: this.Make(),
                LocationId: this.LocationId()
            }
            this.compactors.push(newCompactor);

            this.CompactorNumber = ko.observable("");
            this.Size = ko.observable("");
            this.Make = ko.observable("");
            this.LocationId = ko.observable("");
            $.ajax({
                url: baseUrl + 'compactor',
                type: 'POST',
                data: JSON.stringify(newCompactor),
                contentType: 'application/json',
                success: function () {
                    alert('record added successfully');
                }
            })
        }
        this.removeCompactor = function (compactor) {
            this.compactors.remove(compactor);
        }
            .bind(this);
    };
});
