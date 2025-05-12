import { CommonModule, DatePipe } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
// import { AnalyticalTableComponent } from "../components/analytical-table/react-table";
import { FormsModule } from "@angular/forms";
import { Button, TextAlign } from "@ui5/webcomponents-react";
import React from "react";
import { AnalyticalTableComponent } from "../../components/analytical-table/react-table";
import { ServiceService } from "../../services/service.service";
import { User } from "../../shared/Model/user";
import { AddUserComponent } from "../add-user/add-user.component";
import { UserDetailsComponent } from "../user-details/user-details.component";
import { UserUpdateComponent } from "../user-update/user-update.component";
@Component({
  selector: "app-list-user",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AnalyticalTableComponent,
    AddUserComponent,
    UserDetailsComponent,
    UserUpdateComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./list-user.component.html",
  styleUrl: "./list-user.component.css",
})
export class ListUserComponent implements OnInit {
  @Output() refreshTable: EventEmitter<void> = new EventEmitter<void>();
  @Output() IsOpenToastAlert = new EventEmitter<void>();
  ToastType: string = "";
  totalFaqs: number = 0;
  itemsPerPage: number;
  currentPage = 1;
  odata: boolean;
  loading: boolean = false;
  isInsert: boolean = false;
  isEdit: boolean = false;
  isDetails: boolean = false;
  isDeleteOpen: boolean = false;
  isDeleteLoading: boolean = false;
  isSuccess: boolean = false;
  isDeleteError: boolean = false;
  sucessMessage: string = "";
  filter: string = "";
  Title: string;
  type: string | null = null;
  selectedUserId: number | null = null;
  selectedUserData: any = null;

  user = new User().deserialize({});
  
  constructor(
    private commandService: ServiceService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {
    this.itemsPerPage = this.commandService.itemsPerPage;
    this.odata = this.commandService.odata;
    this.Title = "User";
  }
  ngOnInit(): void {
    console.log(this.odata);
  }

  tableColum() {
    const columns = [
      {
        Header: "Sl No.",
        accessor: ".",
        autoResizable: true,
        disableFilters: true,
        disableGroupBy: true,
        disableSortBy: true,
        className: "custom-class-name",
        Cell: ({ row }: { row: any }) => {
          return React.createElement("span", null, row.index + 1);
        },
        hAlign: "Center" as TextAlign,
        width: 70,
      },

      {
        Header: "First Name",
        accessor: "first_name",
        autoResizable: true,
        className: "custom-class-name",
      },
       {
        Header: "Last Name",
        accessor: "last_name",
        autoResizable: true,
        className: "custom-class-name",
       
      },
      {
        Header: "Email",
        accessor: "email",
        autoResizable: true,
        className: "custom-class-name",
      },
      {
        Header: "Phone",
        accessor: "phone",
        autoResizable: true,
        className: "custom-class-name",
      },
      {
        Header: "address",
        accessor: "address",
        autoResizable: true,
        className: "custom-class-name",
      },
      {
        Header: "Created At",
        accessor: "created_at",
        autoResizable: true,
        className: "custom-class-name",
        hAlign: "Center" as TextAlign,
        Cell: ({ value }: any) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "   Actions",
        accessor: ".",
        cellLabel: () => "",
        disableFilters: true,
        disableGroupBy: true,
        disableSortBy: true,
        autoResizable: true,
        id: "actions",
        className: "custom-class-name",
        hAlign: "Center" as TextAlign,
        Cell: ({ row }: any) => (
          <div>
            <Button
              icon="edit"
              design="Transparent"
              onClick={() => {
                this.editUser(row.original);
              }}
            />
            <Button
              icon="information"
              design="Transparent"
              onClick={() => {
                this.UserDetails(row.original);
              }}
            ></Button>

            <Button
              icon="delete"
              design="Transparent"
              onClick={() => {
                this.deleteUser(row.original);
              }}
            ></Button>
          </div>
        ),
      },
    ];
    return columns;
  }

  handleInsertData(isInsert: boolean): void {
    console.log("Received isInsertData:", isInsert);
    if (isInsert) {
      this.isInsert = isInsert;
    }
  }
  closeAddUserModel() {
    this.isInsert = false;
    this.refreshTable.emit();
  }

  //Edit User
  editUser(original: any): void {
    this.selectedUserId = original.id;
    this.selectedUserData = original;
    this.isEdit = true;
    this.cdr.detectChanges();
  }
  //user details
  UserDetails(original: any): void {
    this.selectedUserId = original.id;
    this.selectedUserData = original;
    this.isDetails = true;
    console.log(this.selectedUserData);
    this.cdr.detectChanges();
  }
  //Delete User
  deleteUser(original: any): void {
    this.selectedUserId = original.id;
    this.selectedUserData = original;
    this.isDeleteOpen = true;
    this.cdr.detectChanges();
  }
  //Delete User Confirm
  deleteUserConfirm() {
    this.isDeleteLoading = true;
    const id = this.selectedUserId;
    this.commandService.delete(`Users/${id}`, this.odata).subscribe({
      next: (response: any) => {
        console.log(response);
        this.isSuccess = true;
        this.isDeleteLoading = false;
        this.isDeleteOpen = false;
        this.ToastType = "Delete User";
        setTimeout(() => {
          this.IsOpenToastAlert.emit();
        }, 1000);
        this.refreshTable.emit();
      },
      error: (error: any) => {
        this.isDeleteError = true;
        this.isDeleteOpen = false;
        this.isDeleteLoading = false;
        this.refreshTable.emit();
      },
    });
  }
  //edit user Model
  closeEditUserModal(): void {
    this.isEdit = false;
    this.selectedUserId = null;
    this.selectedUserData = null;
    this.refreshTable.emit();
    // this.loadUser();
  }

  closeUserDetailsModal() {
    this.isDetails = false;
    this.selectedUserId = null;
    this.selectedUserData = null;
  }

  customData = [
    {
      name: "John Doe",
      email: "study.shihab@gmail.com",
      phone: "1234567890",
      created_at: "2023-10-01",
    },
    {
      name: "John Doe",
      email: "study.shihab@gmail.com",
      phone: "1234567890",
      created_at: "2023-10-01",
    },
    {
      name: "John Doe",
      email: "study.shihab@gmail.com",
      phone: "1234567890",
      created_at: "2023-10-01",
    },
    {
      name: "John Doe",
      email: "study.shihab@gmail.com",
      phone: "1234567890",
      created_at: "2023-10-01",
    },
  ];
}
