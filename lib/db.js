import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    // Force refresh models to pick up schema changes
    if (mongoose.models) {
      Object.keys(mongoose.models || {}).forEach(modelName => {
        delete mongoose.models[modelName];
      });
    }
    if (mongoose.modelSchemas) {
      Object.keys(mongoose.modelSchemas || {}).forEach(modelName => {
        delete mongoose.modelSchemas[modelName];
      });
    }
    return;
  }

  try {
    mongoose.set('strictQuery', false);

    const dbName = process.env.MONGODB_DB || 'magic-mail';
    const uri = process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`;

    // Load connection settings from environment variables
    const connectTimeoutMS = parseInt(process.env.MONGODB_CONNECT_TIMEOUT || '10000');
    const maxPoolSize = parseInt(process.env.MONGODB_MAX_POOL_SIZE || '10');
    const minPoolSize = parseInt(process.env.MONGODB_MIN_POOL_SIZE || '1');
    const heartbeatFrequencyMS = parseInt(process.env.MONGODB_HEARTBEAT_FREQ || '10000');
    const serverSelectionTimeoutMS = parseInt(process.env.MONGODB_SERVER_SELECTION_TIMEOUT || '5000');
    const socketTimeoutMS = parseInt(process.env.MONGODB_SOCKET_TIMEOUT || '45000');

    console.log('Connecting to MongoDB...', { 
      uri, 
      dbName,
      maxPoolSize,
      minPoolSize,
      heartbeatFrequencyMS 
    });

    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoCreate: true,
      dbName: dbName,
      connectTimeoutMS,
      heartbeatFrequencyMS,
      maxPoolSize,
      minPoolSize,
      retryWrites: true,
      retryReads: true,
      w: 'majority',
      wtimeoutMS: 2500,
      readPreference: 'primaryPreferred',
      serverSelectionTimeoutMS,
      socketTimeoutMS,
    });

    isConnected = db.connections[0].readyState === 1;
    
    // Add more detailed connection info
    console.log('MongoDB Connected:', {
      dbName: db.connection.name,
      host: db.connection.host,
      port: db.connection.port,
      readyState: db.connection.readyState,
      collections: Object.keys(db.connection.collections).length
    });

    // Add more robust connection event listeners
    mongoose.connection.on('disconnected', () => {
      console.warn('Lost MongoDB connection...', new Date().toISOString());
      isConnected = false;
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('Reconnected to MongoDB', new Date().toISOString());
      isConnected = true;
    });

    // Add error event listener
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

    // Add monitoring events
    mongoose.connection.on('monitoring', (event) => {
      if (event.serverHeartbeatFailed) {
        console.warn('MongoDB server heartbeat failed:', event);
      }
    });

    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    throw new Error(`Failed to connect to database: ${error.message}`);
  }
};

export const ensureCollection = async (modelName, schema) => {
  try {
    // Ensure we have a database connection first
    if (!isConnected) {
      await connectDB();
    }

    // If model already exists, return it
    if (mongoose.models[modelName]) {
      return mongoose.models[modelName];
    }

    // Add schema timestamps by default if not explicitly disabled
    if (schema.options.timestamps !== false) {
      schema.options.timestamps = true;
    }

    // Generate collection name if not provided
    if (!schema.options.collection) {
      const collectionName = modelName
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '');
      schema.options.collection = collectionName;
    }

    // Add schema options for optimistic concurrency
    schema.options.optimisticConcurrency = true;

    // Create the model
    const model = mongoose.model(modelName, schema);
    
    try {
      // Ensure the collection exists with explicit options
      await model.createCollection({
        capped: schema.options.capped || false,
        size: schema.options.size,
        max: schema.options.max,
        validator: schema.options.validator,
        validationLevel: schema.options.validationLevel || 'moderate',
        validationAction: schema.options.validationAction || 'error'
      });
      
      console.log(`Collection ${schema.options.collection} ensured with options:`, {
        name: schema.options.collection,
        timestamps: schema.options.timestamps,
        validator: !!schema.options.validator,
      });
    } catch (err) {
      // Handle case where collection already exists
      if (err.code !== 48) { // 48 is MongoDB's "NamespaceExists" error
        throw err;
      }
      console.log(`Collection ${schema.options.collection} already exists`);
    }
    
    return model;
  } catch (error) {
    console.error('Error ensuring collection:', error);
    throw error;
  }
};

// Add utility function to check connection status
export const isDbConnected = () => isConnected;

// Add cleanup function for graceful shutdown
export const closeConnection = async () => {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB connection closed.');
  }
};