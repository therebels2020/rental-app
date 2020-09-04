CREATE TABLE User (

  userId int(11) NOT NULL AUTO_INCREMENT, /* FK */
  userName varchar(255),
  fName varchar(255),
  lName varchar(255),
  password varchar(255),
  address varchar(255),
  phoneNumber int(12),
  dob date,
  subExpiry date,

  PRIMARY KEY (userId)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE Location (

  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(60),
  address varchar(80),
  lat float(10,6),
  lng float(10,6),

  PRIMARY KEY (id)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE Review (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  overallScore tinyint,
  reviewDate date,

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE Moisture (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  hasLeaks BOOLEAN,
  isDamp BOOLEAN,
  hasMould BOOLEAN,
  mouldLocation varchar(255),
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE Insulation (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  doubleGlazed BOOLEAN,
  underFloor BOOLEAN,
  wallAndCeiling BOOLEAN,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE Heating (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  hasHeatpump BOOLEAN,
  hasFire BOOLEAN,
  hasHeaters BOOLEAN,
  warmth tinyint,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE WaterQuality (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  cleanWater BOOLEAN,
  goodPressure BOOLEAN,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE Ventilation (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  hasExtractorFans BOOLEAN,
  hasWindows BOOLEAN,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE Maintenance (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  hasDrafts BOOLEAN,
  hasEarthquakeDamage BOOLEAN,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

) ENGINE = InnoDB DEFAULT CHARSET = utf8;
