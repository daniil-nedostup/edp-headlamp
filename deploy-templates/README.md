# edp-headlamp

![Version: 0.23.0-SNAPSHOT](https://img.shields.io/badge/Version-0.23.0--SNAPSHOT-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 0.23.0-SNAPSHOT](https://img.shields.io/badge/AppVersion-0.23.0--SNAPSHOT-informational?style=flat-square)

A Helm chart for KubeRocketCI Headlamp

**Homepage:** <https://docs.kuberocketci.io/>

## Maintainers

| Name | Email | Url |
| ---- | ------ | --- |
| epmd-edp | <SupportEPMD-EDP@epam.com> | <https://solutionshub.epam.com/solution/kuberocketci> |
| sergk |  | <https://github.com/SergK> |

## Source Code

* <https://github.com/epam/edp-headlamp>
* <https://github.com/kinvolk/headlamp>
* <https://kinvolk.io/>

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` | Affinity settings for pod assignment |
| config.baseURL | string | `""` | base url path at which headlamp should run |
| config.defaultNamespace | string | `""` | Define default namespace for the portal. See https://docs.kuberocketci.io/docs/quick-start/platform-installation If not set, the namespace of the pod will be used. |
| config.oidc | object | `{"clientID":"","clientSecretKey":"","clientSecretName":"","enabled":false,"issuerUrl":"","scopes":""}` | For detailed instructions, refer to: https://docs.kuberocketci.io/docs/operator-guide/auth/configure-keycloak-oidc-eks, https://docs.kuberocketci.io/docs/operator-guide/auth/ui-portal-oidc |
| config.oidc.clientID | string | `""` | OIDC client ID |
| config.oidc.clientSecretKey | string | `""` | OIDC client secret key |
| config.oidc.clientSecretName | string | `""` | OIDC client secret name |
| config.oidc.issuerUrl | string | `""` | Microsoft Entra: https://sts.windows.net/<tenant-id>/ |
| config.oidc.scopes | string | `""` | OIDC scopes to be used |
| extraVolumeMounts | list | `[]` | Additional volumeMounts to be added to the container |
| extraVolumes | list | `[]` | Additional volumes to be added to the pod |
| fullnameOverride | string | `""` | Overrides the full name of the chart |
| global.dnsWildCard | string | `nil` | a cluster DNS wildcard name |
| global.platform | string | `"kubernetes"` | platform type that can be "kubernetes" or "openshift" |
| image.repository | string | `"epamedp/edp-headlamp"` | KubeRocketCI headlamp Docker image name. The released image can be found on [Dockerhub](https://hub.docker.com/r/epamedp/edp-headlamp) |
| image.tag | string | `nil` | KubeRocketCI headlamp Docker image tag. The released image can be found on [Dockerhub](https://hub.docker.com/r/epamedp/edp-headlamp/tags) |
| imagePullSecrets | list | `[]` | An optional list of references to secrets in the same namespace to use for pulling any of the images used |
| ingress.annotations | object | `{"nginx.ingress.kubernetes.io/proxy-read-timeout":"1800"}` | Annotations for Ingress resource |
| ingress.enabled | bool | `true` | Enable external endpoint access. Default Ingress/Route host pattern: portal-{{ .Release.Namespace }}.{{ .Values.global.dnsWildCard }} |
| ingress.host | string | `""` | If hosts not defined the will create by pattern "portal-[namespace].[global DNS wildcard]" |
| ingress.tls | list | `[]` | If hosts not defined the will create by pattern "portal-[namespace].[global DNS wildcard]" |
| livenessProbe.failureThreshold | int | `5` |  |
| livenessProbe.initialDelaySeconds | int | `5` |  |
| livenessProbe.periodSeconds | int | `20` |  |
| livenessProbe.successThreshold | int | `1` |  |
| livenessProbe.tcpSocket.port | int | `4466` |  |
| livenessProbe.timeoutSeconds | int | `1` |  |
| nameOverride | string | `"portal"` | Overrides the name of the chart |
| nodeSelector | object | `{}` | Node labels for pod assignment |
| podAnnotations | object | `{}` | Annotations to add to the pod |
| podSecurityContext | object | `{}` | Headlamp pods' Security Context |
| readinessProbe.failureThreshold | int | `5` |  |
| readinessProbe.initialDelaySeconds | int | `5` |  |
| readinessProbe.periodSeconds | int | `20` |  |
| readinessProbe.successThreshold | int | `1` |  |
| readinessProbe.tcpSocket.port | int | `4466` |  |
| readinessProbe.timeoutSeconds | int | `1` |  |
| replicaCount | int | `1` | Number of desired pods |
| resources | object | `{}` | CPU/Memory resource requests/limits |
| securityContext | object | `{}` | Headlamp containers Security Context |
| service.port | int | `80` | Kubernetes Service port |
| service.type | string | `"ClusterIP"` | Kubernetes Service type |
| serviceAccount.annotations | object | `{}` | Annotations to add to the service account |
| serviceAccount.create | bool | `true` | Specifies whether a service account should be created |
| serviceAccount.name | string | `""` | The name of the service account to use.(If not set and create is true, a name is generated using the fullname template) |
| tolerations | list | `[]` | Toleration labels for pod assignment |
