require('./constants/main');

// Start server on pre-defined port
server.listen(port);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: postMaxSize + 'mb'}));

// Cors
app.use(cors(require('./config/cors')));

// Static resources
app.use(express.static('public'))


// Auth Routes
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/users', require('./routes/users'));
app.use('/countries', require('./routes/countries'));
app.use('/provinces', require('./routes/provinces'));
app.use('/directions', require('./routes/directions'));
app.use('/locations', require('./routes/locations'));
app.use('/stories', require('./routes/stories'));
app.use('/categories', require('./routes/categories'));
app.use('/images', require('./routes/images'));

app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(423).json(err.code.toLowerCase())
    }

    // Handle any other errors
});

