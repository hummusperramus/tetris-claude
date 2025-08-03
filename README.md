# Tetris game

Generated with [Claude](https://claude.ai/). I did not type the code, except for minor fixes to make it work.

- It took me 30 minutes to be able to run the project since I logged in to Claude. This includes:
    - Me typing the prompt with all requirements
    - Downloading files one by one and generate project structure (did not considered generating a zip with all project structure, so it would have taken less time).
    - Correct errors to by able to run it (typescript issues, missing dependencies, unused variables, eslint config issue)

- It took me 20 extra minutes to fix all project. This includes:
    - Fix lint errors.
    - Add missing dependencies.
    - Fix build errors.
    - Fix tests.

Take also into account, included in previous times, 5 minutes I spent playing the game.

# Issues and defects

- I explicitly ask project to be created with React 19, but it was created with React 18.
- I explicitly asked to use latest Vite create script, but it created it with an old one (in case it used vite create script). Project has `"vite": "^5.1.0"` but latest one, from vite create at the moment of creating this project, is `"vite": "^7.0.4"`. Updating `vite` may require extra code changes (I haven't checked how easy/hard would be to update it, but from experience I know that non-trivial issues may appear). As a side effect of this, the project has an older `eslint` version.
- Minor issues mentioned above to make the app work and all scripts to work. Issues were easily solved because of familiarity with the technologies.
- `.gitignore` was not created (I did not ask for it though). But has to be provided when pushing it to a repository.
