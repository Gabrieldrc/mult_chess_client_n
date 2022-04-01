# Multiplayer game room client (Changelog)
Últimos cambios realizados al repositorio de multiplayer_game_room_client

<!-- Added | Changed | Fixed | Removed -->
## [Unreleased]

## [v1.2.0] - 2022-21-03
### Added
- Se cambio la forma de iniciar un juego o unirse para que el formulario se haga por metodo http.
- Una vez en el room se conecte a los socket para recibir las actualizaciones de el juego y el chat.
- Se guarda el token para iniciar la conexion con el socket mandando el token asi los jugadores (los que poseen el token), puedan jugar (emitir mensaje a play)

## [v1.1.0] - 2022-21-03
### Added
- Se agrego al componente de MessageComponent para que haga scroll cuando llegue un nuevo mensaje

## [v1.0.0] - 2022-21-03
### Added
- Primer lanzamiento a produccion


[Unreleased]: https://github.com/Gabrieldrc/multiplayer_game_room_client/compare/v1.2.0...HEAD
[v1.2.0]: https://github.com/Gabrieldrc/multiplayer_game_room_client/tags/v1.1.0...v1.2.0
[v1.1.0]: https://github.com/Gabrieldrc/multiplayer_game_room_client/tags/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/Gabrieldrc/multiplayer_game_room_client/tags/v1.0.0
