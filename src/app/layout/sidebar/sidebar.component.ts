import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener
} from '@angular/core';
import { ROUTES } from './sidebar-items';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  public sidebarItems: any[];
  showMenu = 'dashboard';
  showSubMenu = '';
  showSubSubMenu = '';
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  headerHeight = 60;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.split('/')[1] === 'multilevel') {
          this.showMenu = event.url.split('/')[1];
        } else {
          this.showMenu = event.url.split('/').slice(-2)[0];
        }
        this.showSubMenu = event.url.split('/').slice(-2)[0];
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callMenuToggle(event: any, element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
    const hasClass = event.target.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(event.target, 'toggled');
    } else {
      this.renderer.addClass(event.target, 'toggled');
    }
  }
  callSubMenuToggle(event: any, element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  ngOnInit() {
    this.sidebarItems = ROUTES.filter((sidebarItem) => this.filterMenuOptions(sidebarItem));
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  filterMenuOptions(option): Boolean {
    return true;
    // let rol = this.usuarioService.userData?.rol ?? null;
    // switch (option.moduleName) {
    //   case 'maestros':
    //     switch (rol) {
    //       case 'coordMantenimiento':
    //       case 'gerencia':
    //         return true;
    //       default:
    //         return false;
    //     }
    //   case 'reporte':
    //     switch (rol) {
    //       case 'coordMantenimiento':
    //       case 'gerencia':
    //         return true;
    //       default:
    //         return false;
    //     }
    //   case 'OrdenTrabajo':
    //     switch (rol) {
    //       case 'coordMantenimiento':
    //       case 'gerencia':
    //         return true;
    //       default:
    //         return false;
    //     }
    //   case 'Solicitudes':
    //     switch (rol) {
    //       case 'coordMantenimiento':
    //       case 'gerencia':
    //         return true;
    //       default:
    //         return false;
    //     }
    //   case 'MisSolicitudes':
    //     switch (rol) {
    //       case 'analista':
    //       case 'coordMantenimiento':
    //         return true;
    //       default:
    //         return false;
    //     }
    //   default:
    //     break;
    // }
  }

  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
}
