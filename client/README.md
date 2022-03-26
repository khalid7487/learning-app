## 

Script References with script source

while download Script need source type 
script need source type [Mono, Di]

Source Type Distribution
Script Description - To -> Content
Script search -> when upload
Speaker From singture while upload 

## Libs

    npm install react-bootstrap bootstrap@4.6.0
    

- https://chonky.io/docs/2.x/installation-usage
- https://react-bootstrap-v4.netlify.app/components/cards/
- https://codesandbox.io/embed/react-hook-form-password-match-check-standard-validation-eo6en

# Run & Build Application

1. Makes sure you have installed maven

```
mvn --version
```

2. Install Package and build `.war` file.

Before install open `pom.xml` file and check your required configuration like `profile` `host` setting and `artifactId` {corpus-ui}.

```
npm i
mvn clean install
```

* Note: Open `target` folder and deploy that `*.war` file to tomcat.

3. Clean mvn build

```
mvn clean
```


## Libs
- https://github.com/azouaoui-med/react-pro-sidebar



```html
<div style={{display: 'flex'}}>
                <ProSidebar collapsed={collapsedSidebar}  toggled={!collapsedSidebar} onToggle={toggleSidebar}>
                    <Menu>
                        <MenuItem> Main Page  <Link to="/" /> </MenuItem>
                        <MenuItem> Home Dashboard <Link to="/home"/> </MenuItem>

                        <SubMenu title="User Management">
                            <MenuItem>Login</MenuItem>
                            <MenuItem>Registration<Link to="/register"/> </MenuItem>
                            <MenuItem onClick={onLogout}>Logout</MenuItem>


                            {/*<SubMenu title="Components">*/}
                            {/*    <MenuItem>Component 1</MenuItem>*/}
                            {/*    <MenuItem>Component 2</MenuItem>*/}
                            {/*</SubMenu>*/}
                        </SubMenu>
                    </Menu>
                </ProSidebar>
            </div>
```