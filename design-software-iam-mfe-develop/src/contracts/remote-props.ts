import type { RbacCatalogPort } from "../application/ports/RbacCatalogPort";
import type { UserAdministrationPort } from "../application/ports/UserAdministrationPort";
import type { IamMfeProps as PlatformIamMfeProps } from "@sena/frontend-platform";

export interface IamMfeProps extends PlatformIamMfeProps {
  /** Puerto preciso del dominio; su forma compartida se valida en frontend-platform. */
  userAdministration?: UserAdministrationPort;

  /**
   * El shell valida el permiso de administración de usuarios.
   * La ruta también debe estar protegida antes de montar este MFE.
   */
  canManageUsers?: boolean;

  /**
   * HU-IAM-016: el shell inyecta el puerto de lectura RBAC
   * usando su cliente autenticado.
   */
  rbacCatalog?: RbacCatalogPort;

  /**
   * Autorización de lectura RBAC confirmada por el shell.
   * Debe ser false si no hay permiso o no se puede verificar.
   */
  canViewRoleConfig?: boolean;
}
